<template>
  <CtxOptions :props="{ type: 'group', ...props }" :root="root">
    <slot />
  </CtxOptions>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide, onMounted, inject } from "vue";
import { checkIfValid, logError, logWarn } from "@/helpers";
import CtxOptions from "@/CtxOptions.vue";
import { ActionGroup } from "@/types";

const { props } = defineProps<{
  props: ActionGroup;
}>();

checkIfValid(props);

const instance = getCurrentInstance();

const root = instance?.parent?.type.__name == "CtxAnimated";
const isInsideAGroup = inject("root", false);

if (isInsideAGroup) {
  logError(
    `You are trying to nest a ContextGroup inside another ContextGroup with label: ${props.label}. This is currently not supported, will be fixed in future versions`
  );
}

provide("root", !!root);

onMounted(() => {
  const noChildren = !instance!.subTree.children;
  if (noChildren) {
    logWarn(
      `There was no child passed to ContextGroup with label: ${props.label}`
    );
  }
});
</script>
