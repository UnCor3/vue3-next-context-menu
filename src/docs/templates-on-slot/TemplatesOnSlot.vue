<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import Markdown from "../Markdown.vue";
import md from "./TemplatesOnSlot.md?raw";
</script>

<template>
  <div class="example template-on-slot">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="templates-with-slot" area=".example.template-on-slot">
    <ContextOption
      :props="{
        type: 'slot',
        label: 'Test',
        parentSlot: 'parent',
        childSlot: 'child',
      }"
    >
      <template #parent>
        <div>Hello from parent slot</div>
      </template>
      <template #child>
        <div>Hello from child slot</div>
      </template>
    </ContextOption>
  </ContextMenu>
</template>
