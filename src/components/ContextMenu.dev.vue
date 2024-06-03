<script setup lang="ts">
import { provide, onMounted } from "vue";
import type { Options } from "@/types";
import Ctx from "@/CtxAnimated.vue";
import { useContextMenu } from "@/store";
import { normalizeOptions } from "@/utils/normalizeOptions";
import { defaultTheme } from "@/constants";
import { logWarn } from "@/helpers";

const props = defineProps<Options>();
const { state } = useContextMenu();

normalizeOptions(props);

provide("isCtxMenu", true);
provide("usedLabels", []);

onMounted(() => {
  document.querySelectorAll(".vue3-context-menu").length > 1 &&
    logWarn(
      "You are trying to use multiple ContextMenu components in the same app. This library is not tested for this use case, open an issue if want this feature"
    );
});
</script>

<template>
  <Ctx :theme="theme || defaultTheme" v-if="!state.__destroyed">
    <slot />
  </Ctx>
</template>
