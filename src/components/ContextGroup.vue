<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { ActionChild } from "@/types";
import { useContextMenu } from "@/store";
import { onMounted, onUnmounted, provide, inject } from "vue";

// const { props } = defineProps<{
//   props: ActionChild;
// }>();

const accumulatedActions = [] as ActionChild[];

const handle = {
  push: (action: ActionChild) => {
    accumulatedActions.push(action);
  },
};
provide("groupActions", handle);

onMounted(() => {
  //if not a child of ContextMenu
  const isCtxMenu = inject("isCtxMenu");
  if (!isCtxMenu) return;

  const { state } = useContextMenu();
  const action = {
    label: "Test-group",
    type: "group",
    children: accumulatedActions,
  };
  //@ts-ignore
  state.value.actions.push(action);
  console.log(state.value.actions);

  onUnmounted(() => {
    //@ts-ignore
    const optionIndex = state.value.actions.indexOf(action);
    state.value.actions = state.value.actions.filter(
      (_, i) => i !== optionIndex
    );
  });
});
</script>
