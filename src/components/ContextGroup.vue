<template>
  <CtxOptions :props="{ type: 'group', ...props }" :root="root">
    <slot />
  </CtxOptions>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from "vue";
import { ActionGroup } from "@/types";
import CtxOptions from "@/CtxOptions.vue";
const instance = getCurrentInstance();

const root = instance?.parent?.type.__name == "CtxAnimated";

provide("root", !!root);

const { props } = defineProps<{
  props: ActionGroup;
}>();
</script>
