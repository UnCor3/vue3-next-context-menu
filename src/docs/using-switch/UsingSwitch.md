### Using switch type of action

#### If you define a `switch : {isActive : true}` in the props, action will not accept any children and it will render a tick icon if true. You must mutate the isActive property manually because props manipulation by a library isn't a great practice.

```ts
<template>
  <ContextMenu >
    <ContextOption :props="props" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"
import { ref } from "vue";


const props = ref({
  label: "Auto Refresh",
  switch: {
    isActive: true,
  },
  init() {
    this!.switch.isActive = !this!.switch.isActive;
    //return true to keep the context menu open
    return true;
  },
  hotkey: {
    mac: "alt",
    combination: "+ T",
  },
});
</script>
```
