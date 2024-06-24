<template>
  <div class="example no-click">
    <Markdown :md="md" />
  </div>
</template>

<script setup lang="ts">
import Markdown from "../Markdown.vue";
import md from "./Intro.md?raw";
</script>
