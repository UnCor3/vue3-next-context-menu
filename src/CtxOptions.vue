<template>
  <!-- Action -->
  <li
    v-if="props.type === 'action'"
    class="context-option"
    :class="neededClasses"
    ref="liRef"
    :data-label="props.label"
    @click="handleClick"
  >
    <OptionAttrs :props="props" :noChild="noChild">
      <template v-for="(_, name) in $slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data" />
      </template>
    </OptionAttrs>
    <Teleport
      :to="`.vue3-context-hover-menus[data-instance-id=${instanceId}]`"
      v-if="root"
    >
      <ul
        ref="ulRef"
        class="hover-menu"
        :data-after-root="true"
        :data-label="props.label"
        :class="{
          'no-child': noChild,
          overflow: state!.overflowProtection,
        }"
      >
        <slot name="default" />
      </ul>
    </Teleport>
    <ul
      v-else
      ref="ulRef"
      class="hover-menu"
      :data-label="props.label"
      :class="{
        'no-child': noChild,
      }"
    >
      <slot />
    </ul>
  </li>
  <!-- Group -->
  <template v-else-if="props.type == 'group'">
    <li
      class="group"
      :class="{
        show: props.showLabel,
      }"
      :data-label="props.label"
    >
      <slot />
    </li>
  </template>
  <!-- Slot -->
  <template v-else-if="props.type === 'slot'">
    <li
      ref="liRef"
      class="context-option"
      :class="neededClasses"
      :data-label="props.label"
    >
      <OptionAttrs
        :noChild="!props.childSlot"
        :props="props"
        v-if="!props.parentSlot"
      />
      <slot v-else :name="props.parentSlot" />
      <Teleport
        :to="`.vue3-context-hover-menus[data-instance-id=${instanceId}]`"
        v-if="root"
      >
        <ul
          class="hover-menu"
          :class="{
            'no-child': !props.childSlot,
            overflow: state!.overflowProtection,
          }"
          :data-after-root="root ? true : undefined"
          style="display: none"
          ref="ulRef"
        >
          <slot v-if="props.childSlot" :name="props.childSlot" />
        </ul>
      </Teleport>
      <ul
        v-else
        class="hover-menu"
        :class="{
          'no-child': !props.childSlot,
          overflow: state!.overflowProtection,
        }"
        :data-after-root="root ? true : undefined"
        style="display: none"
        ref="ulRef"
      >
        <slot v-if="props.childSlot" :name="props.childSlot" />
      </ul>
    </li>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, onUnmounted, inject } from "vue";
import { createPopper } from "@popperjs/core";
import { useContextMenu } from "@/store";
import type { Action } from "@/types";
import OptionAttrs from "@/OptionAttrs.vue";

const instanceId = inject("instanceId", "default");
const { state } = useContextMenu(instanceId);
const liRef = ref<HTMLElement>();
const ulRef = ref<HTMLElement>();
const shouldShow = ref(false);
const noChild = ref(true);

type OptionsProps = {
  props: Action;
  root: boolean;
};

const { props, root } = defineProps<OptionsProps>();

const neededClasses = computed(() => ({
  clickable:
    //@ts-ignore does not exist on group but undefined is falsy
    props.type === "slot" ? props.childSlot : noChild.value && !props.disabled,
  root,
  //@ts-ignore does not exist on group but undefined is falsy
  disabled: props.disabled,
}));

const handleClick = () => {
  //@ts-ignore
  if (props.disabled || !props.init) return;
  //@ts-ignore
  const shouldClose = props.init(props);
  if (!shouldClose) {
    state.value!.isOpen = false;
  }
};

onMounted(() => {
  if (props.type == "group") return;
  if (!liRef.value || !ulRef.value) return;
  if (ulRef.value.children.length > 0) noChild.value = false;

  root &&
    watch(
      () => state.value!.currentAction,
      () => {
        console.log("current action changed", state.value!.currentAction);
        ulRef.value!.style.display = "none";
        ulRef.value!.removeAttribute("data-show");
        shouldShow.value = false;
      }
    );

  const popperInstance = createPopper(
    liRef.value,
    ulRef.value!,
    //@ts-ignore will be defined once the component is mounted
    state.value.options!.popperOptions
  );
  function show() {
    //@ts-ignore as it is an internal property
    state.value.__ignoreBlur = true;

    if (
      //@ts-ignore
      (props.disabled && !props.openHoverMenuWhenDisabled) ||
      (noChild.value && root)
    ) {
      //@ts-ignore
      state.value.currentAction = null;
      return;
    }

    if (!noChild.value) {
      ulRef.value!.style.display = "block";
      setTimeout(() => {
        ulRef.value!.setAttribute("data-show", "");
        shouldShow.value = true;
        popperInstance.update();
      }, 0);
    }

    if (root) {
      //@ts-ignore as it is an internal property
      state.value.currentAction = props.label;
    }
  }

  function hide() {
    //@ts-ignore as it is an internal property
    state.value.__ignoreBlur = false;
    shouldShow.value = false;

    //need this to refire the blur event
    state.value!.ctxRef!.focus();
    if (root) return;
    ulRef.value!.style.display = "none";
    ulRef.value!.removeAttribute("data-show");
    shouldShow.value = false;
    // if (!root) return;
  }
  const showEvents = ["mouseover", "mouseenter"];
  const hideEvents = ["mouseleave"];
  showEvents.forEach((event) => {
    liRef.value!.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    liRef.value!.addEventListener(event, hide);
  });

  onUnmounted(() => {
    showEvents.forEach((event) => {
      liRef.value!.removeEventListener(event, show);
    });

    hideEvents.forEach((event) => {
      liRef.value!.removeEventListener(event, hide);
    });
    popperInstance.destroy();
  });
});
</script>

<style lang="scss">
.vue3-context-menu,
.vue3-context-hover-menus {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul {
    list-style: none;
  }

  &.light {
    .context-option {
      .hotkey {
        background-color: black;
        color: rgb(255, 255, 255);
      }

      &.highlight {
        animation: highlight-light 0.5s linear;
      }
    }
    .group {
      border-top: 1px solid rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
      &.highlight {
        animation: highlight-light 0.5s linear;
      }
    }
  }

  &.dark {
    .context-option {
      .hotkey {
        background-color: white;
        color: rgba(0, 0, 0, 0.685);
      }

      &.highlight {
        animation: highlight-dark 0.5s linear;
      }
    }
    .group {
      border-top: 1px solid rgba(255, 255, 255, 0.555);
      border-bottom: 1px solid rgba(255, 255, 255, 0.555);
      &.highlight {
        animation: highlight-dark 0.5s linear;
      }
    }
  }

  .context-option {
    display: flex;
    position: relative;
    list-style: none;
    padding: 0.45rem 0.5rem;
    max-width: 100vw;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .context-option {
    &::after {
      content: "";
      position: absolute;
      top: 0%;
      left: 100%;
      width: 0.5rem;
      height: 100%;
      background: transparent;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0%;
      left: 0%;
      width: 0.5rem;
      height: 100%;
      transform: translateX(-100%);
      background: transparent;
    }

    /* &.root {
      &::after {
        display: none;
      }
      &::before {
        display: none;
      }
    } */

    .hotkey {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.1rem;
      border-radius: 0.25rem;
      padding: 0 0.2rem;
      font-size: 0.75rem;
    }

    .check {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.3rem;
      opacity: 0;
      &.checked {
        opacity: 1;
      }
    }
    &.disabled {
      opacity: 0.5;
    }
    &.highlight {
      animation: highlight 0.5s linear;
    }

    &:hover {
      background-color: rgba(128, 128, 128, 0.4);
      border-radius: 0.25rem;
    }
    &.clickable {
      cursor: pointer;
    }
    .sign {
      height: 100%;
      margin-left: 1rem;

      &.hidden {
        opacity: 0;
      }
    }
    .label {
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon {
      max-height: 1rem;
      min-width: 1.5rem;
      svg {
        margin-right: 0.45rem;
      }
    }
  }

  .group {
    padding: 0.5rem 0;
    margin: 0.5rem 0;
    &.show {
      padding: 1.25rem 0 0.5rem 0;
      position: relative;
      &::before {
        content: attr(data-label);
        position: absolute;
        width: 100%;
        top: 0.35rem;
        font-weight: bolder;
        color: gray;
        text-align: center;
        background-color: transparent;
        font-size: 0.55rem;
        left: 0;
      }
    }
  }
}
//todo
.vue3-context-hover-menus {
  z-index: 99999999;
  .hover-menu {
    /* display: none; */
    visibility: hidden;
    opacity: 0;
    scale: 0.98;
    transition: scale ease 0.3s, opacity ease 0.3s;
    border: rgba(128, 128, 128, 0.4) 1px solid;
    padding: 0.5rem;
    border-radius: 0.5rem;
    min-width: 200px;

    &.overflow {
      max-height: 75vh;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  .hover-menu[data-show] {
    /* display: block; */
    visibility: visible;
    scale: 1;
    opacity: 1;
    z-index: 1;
    position: absolute;
  }

  .hover-menu.no-child {
    display: none;
  }
}

@keyframes highlight-dark {
  0% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  25% {
    background-color: rgba(255, 255, 255, 1);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  75% {
    background-color: rgba(255, 255, 255, 1);
  }
  100% {
    background-color: rgba(255, 255, 255, 0);
  }
}

@keyframes highlight-light {
  0% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  25% {
    background-color: rgb(0, 0, 0);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.1);
  }
  75% {
    background-color: rgb(0, 0, 0);
  }
  100% {
    background-color: rgba(255, 255, 255, 0);
  }
}
</style>
