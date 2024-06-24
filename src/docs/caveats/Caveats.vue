<template>
  <div id="caveats" class="example no-click">
    <Markdown :md="md" />
  </div>
</template>

<script setup lang="ts">
import md from "./Caveats.md?raw";
import Markdown from "../Markdown.vue";
</script>
