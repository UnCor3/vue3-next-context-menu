<script lang="ts" setup>
import Markdown from "../Markdown.vue";
import md from "./Installation.md?raw";
</script>

<template>
  <div id="installation" class="example no-click">
    <Markdown :md="md" />
  </div>
</template>
