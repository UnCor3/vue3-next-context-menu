<template>
  <slot></slot>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, provide, reactive } from "vue";
import { ActionChild, ActionGroup } from "@/types";
import { useContextMenu } from "@/store";
import { checkLabelExists } from "@/utils";

const accumulatedActions = [] as ActionChild[];

const { props } = defineProps<{
  props: ActionGroup;
}>();

if (!props) {
  throw new Error("You need to provide props");
}

const action = reactive({
  label: props.label,
  type: "group",
  //todo ts
  //@ts-ignore
  children: accumulatedActions.concat(props.children || []),
});

const handle = {
  push: (action: ActionChild) => {
    accumulatedActions.push(action);
  },
  get: () => action,
};

provide("groupActions", handle);

onMounted(() => {
  if (action.children.length === 0) {
    console.warn(`Group "${action.label}" has no children`);
  }

  checkLabelExists(action.label);

  const { state } = useContextMenu();
  //todo does it also need to be reactive?
  //@ts-ignore
  state.value.actions.push(action);

  onUnmounted(() => {
    //todo ts
    //@ts-ignore
    const optionIndex = state.value.actions.indexOf(action);
    state.value.actions.splice(optionIndex, 1);
  });
});
</script>
