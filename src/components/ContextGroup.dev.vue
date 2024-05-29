<template>
  <CtxOptions :props="action">
    <slot />
  </CtxOptions>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from "vue";
import { ActionChild, ActionGroup } from "@/types";
import { checkLabelExists } from "@/utils";
import CtxOptions from "@/CtxOptions.vue";

const accumulatedActions = ref([]);

const { props } = defineProps<{
  props: ActionGroup;
}>();

if (!props) {
  throw new Error("You need to provide props");
}

const action = ref({
  label: props.label,
  type: "group",
  //todo ts
  //@ts-ignore
  children: accumulatedActions,
});

const handle = {
  push: (action: ActionChild) => {
    accumulatedActions.value.push(action);
  },
  get: () => action,
};

provide("groupActions", handle);

onMounted(() => {
  checkLabelExists(action.label);

  // if (action.children.length === 0) {
  //   console.warn(`Group "${action.label}" has no children`);
  // }
});
</script>
