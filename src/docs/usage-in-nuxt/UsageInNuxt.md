### Using in Nuxt

#### In Nuxt it you must use the `ClientOnly` component to render the context menu. This is due to the use of Teleport

```ts
<script lang="ts" setup>
import { ContextOption, ContextGroup, ContextMenu } from "vue3-context-menu/components";
import "vue3-context-menu/styles.css"


const backProps = {
  label: 'Back',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};

const forwardProps = {
  label: 'Forward',
  init: () => console.log('Test'),
  disabled: true,
  preserveIconSpace: true,
};

const actionProps = {
  label: 'Reload',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};
</script>
<template>
<ClientOnly>
  <ContextMenu theme="light">
    <ContextOption
      :props="backProps"
    />
    <ContextOption
      :props="forwardProps"
    />
    <ContextOption
      :props="actionProps"
    />
  </ContextMenu>
</ClientOnly>
</template>
```
