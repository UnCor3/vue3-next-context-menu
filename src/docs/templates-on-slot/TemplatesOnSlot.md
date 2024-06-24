### Option with type slot

#### Replace both parent and child slot with your own components

```ts
<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"

</script>

<template>
  <ContextMenu id="templates">
    <ContextOption
      :props="{
        type: 'slot',
        label: 'Test',
        parentSlot: 'parent',
        childSlot: 'child',
      }"
    >
      <template #parent>
        <div>Hello from slot</div>
      </template>
      <template #child>
        <div>Hello from child slot</div>
      </template>
    </ContextOption>
  </ContextMenu>
</template>
```
