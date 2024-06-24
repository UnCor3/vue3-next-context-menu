### Multiple Instances

#### This library supports multiple instances. All you need is to give ids and different areas to ContextMenus. Also check [api](#Api) usage with multiple instances.

```ts
<template>
  <ContextMenu id="using-ins1" area=".example.ins1">
    <ContextOption :props="ins1" />
  </ContextMenu>
  <ContextMenu id="using-ins2" area=".example.ins2">
    <ContextOption :props="ins2" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-context-menu/components";
import "vue3-context-menu/styles.css"


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
```
