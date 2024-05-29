<template>
  <!-- Action -->
  <li
    v-if="props.type === 'action'"
    class="context-option"
    :class="neededClasses"
    ref="liRef"
    :data-label="props.label"
  >
    <OptionAttrs :props="props" />
    <Teleport to=".vue-3-context-hover-menus" v-if="!root">
      <ul
        ref="ulRef"
        class="hover-menu"
        :class="{
          'no-child': !props.children,
        }"
      >
        <slot />
        <!-- <template v-for="child in props.children">
          <CtxOptions :props="child" :root="false">
            <template
              v-for="(
                _, //@ts-ignore
                name
              ) in $slots"
              v-slot:[name]="//@ts-ignore
              data"
            >
              <slot :name="name" v-bind="data" />
            </template>
          </CtxOptions>
        </template> -->
      </ul>
    </Teleport>
    <ul
      v-else
      ref="ulRef"
      class="hover-menu"
      :class="{
        'no-child': !props.children,
      }"
    >
      <slot :teleportRef="'aaa'" />
      <!-- <template v-for="child in props.children">
          <CtxOptions :props="child" :root="false">
            <template
              v-for="(
                _, //@ts-ignore
                name
              ) in $slots"
              v-slot:[name]="//@ts-ignore
              data"
            >
              <slot :name="name" v-bind="data" />
            </template>
          </CtxOptions>
        </template> -->
    </ul>
  </li>
  <!-- Group -->

  <!-- Slot -->
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch, computed } from "vue";
import { createPopper } from "@popperjs/core";
import { useContextMenu } from "@/store";
import type { Action } from "@/types";
import OptionAttrs from "@/OptionAttrs.vue";
// import { preventOverflow, flip } from "@popperjs/core/lib/modifiers";
// import { remToPx } from "./helpers";
// const offsetModifier = {
//   name: "offset",
//   options: {
//     offset: [0, remToPx(0.5)],
//   },
// };

const { state } = useContextMenu();
const liRef = ref<HTMLElement>();
const ulRef = ref<HTMLElement>();
const shouldShow = ref(false);

type OptionsProps = {
  props: Action;
  root: boolean;
};

const { props, root } = defineProps<OptionsProps>();
console.log(props.type);
// const popperOptions = {
//   modifiers: [offsetModifier, preventOverflow, flip],
//   strategy: root ? "absolute" : "relative",
//   placement: "right-start",
// };

const neededClasses = computed(() => ({
  clickable: props.type === "slot" ? props.childSlot : !props.children,
  root,
  //@ts-ignore does not exist on group but undefined is falsy
  disabled: props.disabled,
}));

onMounted(() => {
  //todo is this needed ?
  if (!liRef.value || !ulRef.value) return;
  console.log(liRef.value, ulRef.value);
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

  if (typeof props === "object" && props.type == "group") return;
  console.log(props);
  const popperInstance = createPopper(
    liRef.value,
    ulRef.value!,
    state.value.popperOptions as any
  );
  function show() {
    console.log("hit show");
    ulRef.value!.style.display = "block";
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
    // console.log("root", root, { label: props.label });
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
  .context-option {
    display: flex;
    position: relative;
    list-style: none;
    padding: 0.45rem 0.5rem;
    max-width: 100vw;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* min-width: 200px; */
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
      background-color: white;
      border-radius: 0.25rem;
      color: rgba(0, 0, 0, 0.685);
      padding: 0.2rem;
      font-size: 0.85rem;
    }

    .checked {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.3rem;
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
      min-width: 1.5rem;
    }
  }

  .group {
    padding: 0.2rem 0;
    margin: 0.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.555);
    border-bottom: 1px solid rgba(255, 255, 255, 0.555);
  }
}

.vue-3-context-hover-menus {
  .hover-menu {
    /* display: none; */
    visibility: hidden;
    opacity: 0;
    scale: 0.98;
    transition: scale ease 0.3s, opacity ease 0.3s;
    border: rgba(128, 128, 128, 0.4) 1px solid;
    background-color: black;
    padding: 0.5rem;
    border-radius: 0.5rem;
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
