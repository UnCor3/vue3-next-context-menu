<template>
  <div id="props" class="example no-click">
    <Markdown :md="md" />
  </div>
</template>

<script setup lang="ts">
import Markdown from "../Markdown.vue";
import md from "./Props.md?raw";
</script>
