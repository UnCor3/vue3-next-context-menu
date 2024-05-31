<template>
  <CtxOptions :props="props" :root="root">
    <slot />
  </CtxOptions>
</template>
<script setup lang="ts">
import { onMounted, getCurrentInstance, provide } from "vue";
import { ActionGroup } from "@/types";
import { checkLabelExists } from "@/utils";
import CtxOptions from "@/CtxOptions.vue";
const instance = getCurrentInstance();

const root = instance?.parent?.type.__name == "CtxAnimated";

provide("root", !!root);

const { props } = defineProps<{
  props: ActionGroup;
}>();

if (!props) {
  throw new Error("You need to provide props");
}

onMounted(() => {
  checkLabelExists(props.label);
});
</script>
