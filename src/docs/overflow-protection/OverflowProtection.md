- ### Overflow

#### In this example `overflowProtection` is false so that you can go as deep as you want.

```ts
<template>
  <ContextMenu>
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }" >
        <ContextOption :props="{ label: 'Rotate 180deg' }" >
            <ContextOption :props="{ label: 'Rotate 270deg' }" />
        </ContextOption>
      </ContextOption>
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
