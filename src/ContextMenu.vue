<script setup lang="ts">
import { handleContextMenu } from "@/behaviours/handleContextMenu";
import { onMounted, ref, watch, provide } from "vue";
import type { ExplorerOptions } from "@/types";
import { normalizeArea } from "@/utils";
import Ctx from "@/CtxAnimated.vue";
import { useContextMenu } from "@/store";
import { normalizeOptions } from "./utils/normalizeOptions";

const props = defineProps<ExplorerOptions>();
const ctxMenuRef = ref<{
  elm: HTMLElement;
}>();

const { state } = useContextMenu();

state.value = normalizeOptions(props);

provide("isCtxMenu", true);

onMounted(async () => {
  if (!ctxMenuRef.value?.elm) return;
  //popper options need to be ready before this component is mounted
  let normalizedOptions = await normalizeArea(props);
  //todo
  //@ts-ignore
  normalizedOptions.area.addEventListener(
    "contextmenu",
    handleContextMenu(ctxMenuRef.value.elm)
  );

  ctxMenuRef.value.elm.addEventListener("blur", (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.value.isOpen = false;
  });

  //! IS THIS NEEDED?
  //todo
  // ctxMenuRef.value.elm.addEventListener("mouseleave", () => {
  //   state.value.currentAction = null;
  // });

  watch(
    () => state.value.isOpen,
    (isOpen) => {
      if (isOpen) {
        ctxMenuRef.value!.elm.focus();
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <Ctx ref="ctxMenuRef">
    <slot />
    <!-- <template v-for="(_, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template> -->
  </Ctx>
</template>
