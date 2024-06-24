<script lang="ts" setup>
import { ContextOption, ContextMenu } from "@/Components";
import Markdown from "../Markdown.vue";
import md from "./Casual.md?raw";

const backProps = {
  label: "Back",
  init: () => console.log("Test"),
  preserveIconSpace: true,
};

const forwardProps = {
  label: "Forward",
  init: () => console.log("Test"),
  disabled: true,
  preserveIconSpace: true,
};

const ActionProps = {
  label: "Reload",
  init: () => console.log("Test"),
  preserveIconSpace: true,
};
</script>
<template>
  <div id="usage" class="example casual">
    <Markdown :md="md" />
  </div>

  <ContextMenu theme="light" area=".example.casual">
    <ContextOption :props="backProps" />
    <ContextOption :props="forwardProps" />
    <ContextOption :props="ActionProps" />
  </ContextMenu>
</template>
