<template>
  <div></div>
</template>
<script setup lang="ts">
import { normalizeOptions } from "@/utils";
import { onMounted } from "vue";
import type { ExplorerOptions } from "@/types";
import { useContextMenu } from "@/store";

const { props } = defineProps<{
  props: ExplorerOptions;
}>();

onMounted(async () => {
  console.log("init handle");
  const { state } = useContextMenu();
  await normalizeOptions(props);
  console.log(state.value.popperOptions);
});
</script>
