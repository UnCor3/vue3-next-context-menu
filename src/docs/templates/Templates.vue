<template>
  <div class="example templates">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="templates" area=".example.templates">
    <ContextOption
      :props="{
        label: 'Foo',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    >
      <template #Icon> Icon </template>
      <template #Label>
        <div>Label</div>
      </template>
      <template #Hotkey>
        <div>Hotkey</div>
      </template>
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextMenu, ContextOption } from "@/Components";
import Markdown from "../Markdown.vue";
import md from "./Templates.md?raw";
</script>
