<template>
  <div class="example options">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="nesting-option" area=".example.options">
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }" />
      <ContextOption :props="{ label: 'Rotate 180deg' }" />
      <ContextOption :props="{ label: 'Rotate 270deg' }" />
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import RotateSvg from "@/icons/Rotate.svg?raw";
import Markdown from "../Markdown.vue";
import md from "./NestingOption.md?raw";

const RotateProps = {
  label: "Rotate",
  disabled: false,
  icon: RotateSvg,
};
</script>
