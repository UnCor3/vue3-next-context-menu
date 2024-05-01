<script setup lang="ts">
import { handleContextMenu } from "@/behaviours/handleContextMenu";
import { nextTick, onMounted, ref, watch } from "vue";
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

onMounted(async () => {
  if (!ctxMenuRef.value?.elm) return;
  //popper options need to be ready before this component is mounted
  let normalizedOptions = await normalizeArea(props);
  normalizedOptions.area.addEventListener(
    "contextmenu",
    handleContextMenu(ctxMenuRef.value.elm)
  );

  ctxMenuRef.value.elm.addEventListener("blur", (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.value.isOpen = false;
  });

  ctxMenuRef.value.elm.addEventListener("mouseleave", () => {
    state.value.currentAction = null;
  });

  watch(
    state,
    (state) => {
      if (state.isOpen) {
        nextTick(() => {
          ctxMenuRef.value!.elm.focus();
        });
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <Ctx ref="ctxMenuRef">
    <template v-for="(_, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </Ctx>
</template>
