<template>
  <div>
    <Markdown :md="md" />
  </div>
  <div style="display: flex; gap: 2rem">
    <div
      style="flex: 1; height: 500px; padding: 1rem; border-radius: 0.5rem"
      class="example ins1"
    >
      Instance 1
    </div>
    <div
      style="flex: 1; height: 500px; padding: 1rem; border-radius: 0.5rem"
      class="example ins2"
    >
      Instance 2
    </div>
  </div>
  <ContextMenu id="using-ins1" area=".example.ins1">
    <ContextOption :props="ins1" />
  </ContextMenu>
  <ContextMenu id="using-ins2" area=".example.ins2">
    <ContextOption :props="ins2" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import Markdown from "../Markdown.vue";
import md from "./Instances.md?raw";

const ins1 = {
  label: "Instance 1",
  init: () => {
    console.log("ins 1");
  },
};

const ins2 = {
  label: "Instance 2",
  init: () => {
    console.log("ins 2");
  },
};
</script>
