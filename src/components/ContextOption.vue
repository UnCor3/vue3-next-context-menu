<template></template>
<script setup lang="ts">
import { Action } from "@/types";
import { useContextMenu } from "@/store";
import { onMounted, onUnmounted, inject } from "vue";

const { props } = defineProps<{
  props: Action;
}>();

const { state } = useContextMenu();

setTimeout(() => {
  // console.log(state.value.actions);
}, 4000);
const groupActions = inject("groupActions") as Action[];

const getAction = (action: Action) => {
  if (typeof action === "object") {
    return Object.assign(
      {
        type: "action",
      },
      props
    );
  }
  return action;
};

if (groupActions) {
  groupActions.push(getAction(props));
} else {
  state.value.actions.push(getAction(props));
}

onMounted(() => {
  //only need this if it is not a group
  !groupActions &&
    onUnmounted(() => {
      //filtering trough reference does not work idk why
      //so had to first find the index and then filter it
      //TODO
      const optionIndex = state.value.actions.indexOf(action);
      state.value.actions = state.value.actions.filter(
        (_, i) => i !== optionIndex
      );
    });
});
</script>
