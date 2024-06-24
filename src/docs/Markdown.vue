<script setup lang="ts">
import { getMdRender } from "./helpers";

defineProps<{
  md: string;
}>();
</script>
<template>
  <div style="width: 100%; background-color: #0d1117">
    <div style="width: 70%; margin: auto">
      <div v-html="getMdRender(md)" />
    </div>
  </div>
</template>
