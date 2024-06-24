### Nest ContextOption(s) inside a ContextOption

#### If you want to go deeper than this you need to pass `overflowProtection` as false to the ContextMenu component, check it out [here](#overflow).

```ts
<template>
  <ContextMenu>
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }" />
      <ContextOption :props="{ label: 'Rotate 180deg' }" />
      <ContextOption :props="{ label: 'Rotate 270deg' }" />
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import MuteSvg from "@/icons/Mute.svg?raw";
import "vue3-next-context-menu/styles.css"

const RotateProps = {
  label: "Rotate",
  disabled: false,
  icon: MuteSvg,
};
</script>
```
