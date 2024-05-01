<template>
  <div>Hello from a custom component {{ JSON.stringify($props) }}</div>
  <!-- {{ contextMenuProps.isOpen }} -->
</template>
<script setup lang="ts">
type ContextMenuProps = {
  contextMenuProps: {
    isOpen: boolean;
  };
};
const props = defineProps();

console.log("init test");
</script>
