<template>
  <div>hello</div>
</template>
<script setup lang="ts">
import { inject, onMounted } from "vue";

const isInsideContextGroup = inject("isInsideContextGroup", false);

onMounted(() => {
  console.log(isInsideContextGroup, "context elm");
});
</script>
