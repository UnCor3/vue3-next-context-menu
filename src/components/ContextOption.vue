<template>
  <div>aa</div>
</template>
<script setup lang="ts">
import { ActionChild } from "@/types";
import { useContextMenu } from "@/store";
import { onMounted, onUnmounted } from "vue";

const { props } = defineProps<{
  props: ActionChild;
}>();

const { state } = useContextMenu();
console.log("hit ctx option");
state.value.actions.push(props);
onMounted(() => {
  console.log("hit");
  onUnmounted(() => {
    state.value.actions = state.value.actions.filter(
      (action) => action !== props
    );
  });
});
</script>
