<template>
  <!-- Action -->
  <li
    v-if="typeof props === 'object' && props.type == 'action'"
    class="context-option"
    :class="{
      clickable: !props.children,
      root,
      disabled: props.disabled,
    }"
    ref="liRef"
    liRef="true"
  >
    <span class="label">
      {{ props.label }}
    </span>
    <span
      v-if="
        typeof props === 'object' && props.type === 'action' && props.hotkey
      "
      class="hotkey"
    >
      <template v-if="props.hotkey.mac">
        <Command v-if="props.hotkey.mac === 'command'" />
        <Alt v-if="props.hotkey.mac === 'alt'" />
      </template>
      {{ props.hotkey.combination }}</span
    >
    <span class="checked" v-if="props.enabled"> <Tick /> </span>
    <span class="sign" v-if="props.children"><ArrowRight /></span>
    <Teleport to="body" v-if="root">
      <Option
        :children="props.children!"
        :isOpen="isOpen"
        :root="false"
        ref="ulRef"
      >
        <template
          v-for="(
            _, //@ts-ignore
            name
          ) in $slots"
          v-slot:[name]="data"
        >
          <slot :name="name" v-bind="data"></slot>
        </template>
      </Option>
    </Teleport>
    <Option
      :children="props.children!"
      :isOpen="isOpen"
      :root="root"
      v-else
      ref="ulRef"
    >
      <template
        v-for="(
          _, //@ts-ignore
          name
        ) in $slots"
        v-slot:[name]="data"
      >
        <slot :name="name" v-bind="data"></slot>
      </template>
    </Option>
  </li>
  <!-- Group -->
  <template v-else-if="typeof props === 'object' && props.type == 'group'">
    <li class="group">
      <CtxOptions v-for="option in props.children" :props="option" :root="root">
        <template v-for="(_, name) in $slots" v-slot:[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </CtxOptions>
    </li>
  </template>
  <!-- Slot -->
  <template v-if="typeof props === 'string'">
    <li ref="liRef" class="context-option">
      <span class="label">
        {{ props }}
      </span>
      <Teleport to="body">
        <ul
          class="hover-menu"
          :ref="
            (e) =>
              (ulRef = {
                element: e,
              })
          "
        >
          <slot :name="props" />
        </ul>
      </Teleport>
    </li>
  </template>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";
import { createPopper } from "@popperjs/core";
import { useContextMenu } from "@/store";
import type { Action } from "./types";
import Option from "./Option.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import Command from "@/icons/Command.vue";
import Alt from "@/icons/Alt.vue";
import Tick from "@/icons/Tick.vue";

const { state } = useContextMenu();
const liRef = ref<HTMLElement>();
const ulRef = ref<{
  element: HTMLElement;
}>();
const shouldShow = ref(false);

type OptionsProps = {
  props: Action;
  isOpen: boolean;
  root: boolean;
};

const { props, root } = defineProps<OptionsProps>();
onMounted(async () => {
  // console.log(props);
  if (!liRef.value || !ulRef.value?.element) return;
  root &&
    watch(
      () => state.value.currentAction,
      () => {
        if (shouldShow.value) {
          ulRef.value!.element.removeAttribute("data-show");
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
          ulRef.value!.element.removeAttribute("data-show");
          shouldShow.value = false;
        }
      }
    );

  //   watch(
  //   () => state.value.currentAction,
  //   (action,prevAction) => {
  //     if (!action) return;
  //       if (
  //         typeof action === "string" &&

  //       ) {
  //         console.log("show string");
  //         show();
  //       }
  //       //action
  //       if (
  //         typeof action === "object" &&
  //         typeof rootAction === "object" &&
  //         action.label === rootAction.label &&
  //         action.type === "action"
  //       ) {
  //         console.log("show object");
  //         show();
  //       } else {
  //         console.log("hide");
  //         hide();
  //       }
  //     }

  // );
  if (typeof props === "object" && props.type == "group") return;
  const popperInstance = createPopper(
    liRef.value!,
    ulRef.value.element!,
    state.value.popperOptions!
  );
  function show() {
    if (root) {
      state.value.currentAction = props;
    }
    ulRef.value!.element.setAttribute("data-show", "true");
    popperInstance.update();
    shouldShow.value = true;
    // console.log("root", root, { label: props.label });
    if (!root) return;
    if (state.value.currentAction === props) return;
    // state.value.currentAction = props;
  }

  function hide() {
    if (root) return;
    ulRef.value!.element.removeAttribute("data-show");
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

<style scoped>
.context-option:hover .hover-menu {
}
/* .hover-menu:hover .context-option {
  visibility: visible;
  scale: 1;
  opacity: 1;
  z-index: 1;
  position: absolute;
} */

.context-option.root:after {
  display: none;
}

.context-option.root:before {
  display: none;
}

.context-option .hotkey {
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

.context-option .checked {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.3rem;
}

.context-option.disabled {
  opacity: 0.5;
}

.context-option::after {
  content: "";
  position: absolute;
  top: 0%; /* Position it at the bottom of the parent */
  left: 100%;
  width: 0.5rem;
  height: 100%; /* Adjust this to the size of the gap */
  background: transparent;
}
.context-option::before {
  content: "";
  position: absolute;
  top: 0%; /* Position it at the bottom of the parent */
  left: 0%;
  width: 0.5rem;
  height: 100%; /* Adjust this to the size of the gap */
  transform: translateX(-100%);
  background: transparent;
}

.hover-menu[data-show] {
  visibility: visible;
  scale: 1;
  opacity: 1;
  z-index: 1;
  position: absolute;
}

.group {
  padding: 0.2rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.555);
  border-bottom: 1px solid rgba(255, 255, 255, 0.555);
}
</style>
