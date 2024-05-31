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
    <Teleport to=".vue-3-context-hover-menus" v-if="root">
      <ul
        ref="ulRef"
        class="hover-menu"
        :class="{
          'no-child': noChild,
        }"
      >
        <slot name="default" />
      </ul>
    </Teleport>
    <ul
      v-else
      ref="ulRef"
      class="hover-menu"
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
      <Teleport to=".vue-3-context-hover-menus">
        <ul
          class="hover-menu"
          :class="{
            'no-child': !props.childSlot,
          }"
          ref="ulRef"
        >
          <slot v-if="props.childSlot" :name="props.childSlot" />
        </ul>
      </Teleport>
    </li>
  </template>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, computed } from "vue";
import { createPopper } from "@popperjs/core";
import { useContextMenu } from "@/store";
import type { Action } from "@/types";
import OptionAttrs from "@/OptionAttrs.vue";

const { state } = useContextMenu();
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
  //todo need a better iplementation
  root,
  //@ts-ignore does not exist on group but undefined is falsy
  disabled: props.disabled,
}));

const handleClick = () => {
  //@ts-ignore
  if (props.disabled) return;
  //@ts-ignore
  const shouldClose = props.init(props);
  if (!shouldClose) {
    state.value.isOpen = false;
  }
};

onMounted(() => {
  //todo is this needed ?
  if (!liRef.value || !ulRef.value) return;
  if (ulRef.value.children.length > 0) noChild.value = false;

  ulRef.value!.style.display = "none";

  root &&
    watch(
      () => state.value.currentAction,
      () => {
        if (shouldShow.value) {
          ulRef.value!.style.display = "none";
          ulRef.value!.removeAttribute("data-show");
          shouldShow.value = false;
        }
      }
    );

  root &&
    watch(
      () => state.value.isOpen,
      (isOpen) => {
        // console.log(isOpen);
        if (!isOpen && shouldShow.value) {
          ulRef.value!.removeAttribute("data-show");
          shouldShow.value = false;
        }
      }
    );

  if (props.type == "group") return;
  const popperInstance = createPopper(
    liRef.value,
    ulRef.value!,
    state.value.popperOptions as any
  );
  function show() {
    if (!noChild.value) {
      ulRef.value!.style.display = "block";
    }
    // if (props.type === "slot" && !props.childSlot) {
    //   shouldShow.value = true;
    //   return;
    // }
    if (root) {
      state.value.currentAction = props;
    }
    //hack to get the animation to work
    //by calling it after the call stack is done
    setTimeout(() => {
      ulRef.value!.setAttribute("data-show", "");
    }, 0);
    popperInstance.update();
    shouldShow.value = true;
    if (!root) return;
    if (state.value.currentAction === props) return;
    // state.value.currentAction = props;
  }

  function hide() {
    if (root) return;
    ulRef.value!.style.display = "none";
    ulRef.value!.removeAttribute("data-show");
    if (!root) return;
    shouldShow.value = false;
  }
  const showEvents = ["mouseover", "mouseenter"];
  const hideEvents = ["mouseleave"];
  showEvents.forEach((event) => {
    liRef.value!.addEventListener(event, show);
  });

  hideEvents.forEach((event) => {
    liRef.value!.addEventListener(event, hide);
  });
});
</script>

//todo does it need to be scoped ?
<style lang="scss">
.vue-3-context-menu,
.vue-3-context-hover-menus {
  &.light {
    .context-option {
      .hotkey {
        background-color: black;
        color: rgb(255, 255, 255);
      }
    }
    .group {
      border-top: 1px solid rgba(0, 0, 0, 0.25);
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
  }

  &.dark {
    .context-option {
      .hotkey {
        background-color: white;
        color: rgba(0, 0, 0, 0.685);
      }
    }
    .group {
      border-top: 1px solid rgba(255, 255, 255, 0.555);
      border-bottom: 1px solid rgba(255, 255, 255, 0.555);
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

    &.root {
      &::after {
        display: none;
      }
      &::before {
        display: none;
      }
    }

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
      }
    }
  }
}

.vue-3-context-hover-menus {
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

@keyframes highlight {
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
</style>
