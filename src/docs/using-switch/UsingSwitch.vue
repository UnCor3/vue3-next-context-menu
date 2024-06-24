<template>
  <div id="using-switch-type-of-action" class="example switch">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="using-switch" area=".example.switch">
    <ContextOption :props="props" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import Markdown from "../Markdown.vue";
import md from "./UsingSwitch.md?raw";
import { ref } from "vue";

const props = ref({
  label: "Auto Refresh",
  switch: {
    isActive: true,
  },
  init() {
    this!.switch.isActive = !this!.switch.isActive;
    return true;
  },
  hotkey: {
    mac: "alt",
    combination: "+ T",
  },
});
</script>
