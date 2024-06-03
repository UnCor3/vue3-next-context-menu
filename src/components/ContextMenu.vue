<script setup lang="ts">
import { provide } from "vue";
import type { Options } from "@/types";
import Ctx from "@/CtxAnimated.vue";
import { useContextMenu } from "@/store";
import { normalizeOptions } from "@/utils/normalizeOptions";
import { defaultTheme } from "@/constants";

const props = defineProps<Options>();

const { state } = useContextMenu();

normalizeOptions(props);

provide("isCtxMenu", true);
</script>

<template>
  <Ctx :theme="theme || defaultTheme" v-if="!state.__destroyed">
    <slot />
  </Ctx>
</template>
