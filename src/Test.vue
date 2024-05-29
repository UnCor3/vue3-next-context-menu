<template>
  <div>Hello from a custom component {{ JSON.stringify($props) }}</div>
  <!-- {{ contextMenuProps.isOpen }} -->
</template>
<script setup lang="ts">
//@ts-ignore
type ContextMenuProps = {
  contextMenuProps: {
    isOpen: boolean;
  };
};
//@ts-ignore

const props = defineProps();
</script>
