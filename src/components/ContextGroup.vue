<template>
  <slot />
</template>

<script setup lang="ts">
import { defineProps, onMounted, provide, computed } from "vue";
import { useContextMenu } from "../index";

const { state } = useContextMenu();
// defineProps<{
//   label: string;
//   init: () => void;
//   children: string[];
// }>();
const indexOfAction = computed(() => state.value.actions.length);
// state.value.actions.push({
//   label: "Test1421",
//   init: () => console.log("Test"),
// });

provide("isInsideContextGroup", true);

onMounted(() => {
  console.log("mounted");
  console.log(indexOfAction);
});
</script>
