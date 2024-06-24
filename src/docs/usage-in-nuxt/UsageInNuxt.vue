<script setup lang="ts">
import Markdown from "../Markdown.vue";
import md from "./UsageInNuxt.md?raw";
</script>
<template>
  <div class="example no-click" id="using-in-nuxt">
    <Markdown :md="md" />
  </div>
</template>
