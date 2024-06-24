### Using templates

#### Using the registered templates you can render any content. 'Icon', 'Label','Hotkey' are the slots available unless you pass `switch` property in the props check next example for that.

```ts
<template>
  <ContextMenu>
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
      //Only available if switch property is passed in the props
      // <template #Switch>
      //   <div>Switch</div>
      // </template>
    </ContextOption>
  </ContextMenu>
</template>
<script setup lang="ts">
import { ContextMenu, ContextOption } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"

</script>
```
