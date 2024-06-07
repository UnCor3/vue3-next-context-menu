<script lang="ts" setup>
import { ContextOption, ContextMenu } from "@/Components";
import { ref } from "vue";
const casualRef = ref<HTMLElement>();

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
  <div class="example" ref="casualRef">
    Here is a simple example of a Context Menu in action. Right click anywhere
    on the page to see the context menu in action.
  </div>

  <ContextMenu theme="light" :area="casualRef">
    <ContextOption :props="backProps" />
    <ContextOption :props="forwardProps" />
    <ContextOption :props="ActionProps" />
  </ContextMenu>
</template>
