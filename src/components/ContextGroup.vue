<template>
  <CtxOptions :props="{ type: 'group', ...props }" :root="root">
    <slot />
  </CtxOptions>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from "vue";
import CtxOptions from "@/CtxOptions.vue";
import { ActionGroup } from "@/types";

const { props } = defineProps<{
  props: ActionGroup;
}>();

const instance = getCurrentInstance();

const root = instance?.parent?.type.__name == "CtxAnimated";

provide("root", !!root);
</script>
