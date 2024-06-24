### Using Group

#### You can nest ContextOption(s) inside ContextGroup to group them together. You can also pass showLabel to display the label on the top of the group.You cannot nest ContextGroup(s) inside ContextGroup.

```ts
<template>
  <ContextMenu>
    <ContextGroup :props="GroupProps">
      <ContextOption :props="RewindProps" />
      <ContextOption :props="CutProps" />
      <ContextOption :props="MuteProps" />
    </ContextGroup>
  </ContextMenu>
</template>
<script setup lang="ts">
import { ContextGroup, ContextOption, ContextMenu } from "vue3-context-menu/Components";
import "vue3-context-menu/styles.css"

//you can also use templates to pass icons check for template usage down below
import RewindSvg from "@/assets/Rewind.svg?raw";
import CutSvg from "@/assets/Cut.svg?raw";
import MuteSvg from "@/assets/Mute.svg?raw";

const GroupProps = {
  label: "Video Controls",
  showLabel: true,
};

const RewindProps = {
  label: "Rewind",
  init: () => console.log("Test"),
  disabled: false,
  hotkey: {
    mac: "alt",
    combination: "+ T",
  },
  icon: RewindSvg,
};

const CutProps = {
  label: "Cut",
  init: () => {
    console.log("Test");
    return true;
  },
  disabled: false,
  icon: CutSvg,
};

const MuteProps = {
  label: "Mute",
  init: () => console.log("Test"),
  disabled: false,
  icon: MuteSvg,
};
</script>
```
