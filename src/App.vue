<script setup lang="ts">
import { ContextOption, ContextGroup, ContextMenu } from "./Components";
import { useContextMenu } from "@/index";
import RewindSvg from "@/icons/Rewind.svg?raw";
import CutSvg from "@/icons/Cut.svg?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
import { ref } from "vue";
import { Action } from "@/types";

const ctx = useContextMenu();
setTimeout(() => {
  // ctx.api.highlight("Video Controls", "last");
  console.log(ctx.state.value);
}, 1000);
//@ts-ignore
const testProps = ref<Action>({
  type: "action",
  label: "Test2111",
  init() {
    this.switch!.isActive = !this.switch!.isActive;
    return true;
  },
  switch: {
    isActive: true,
  },
});
</script>

<template>
  <ContextMenu theme="light">
    <ContextOption
      :props="{
        label: 'Back',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    />
    <ContextOption
      :props="{
        type: 'action',
        label: 'Forward',
        init: () => console.log('Test'),
        disabled: true,
        preserveIconSpace: true,
      }"
    />
    <ContextOption
      :props="{
        type: 'action',
        label: 'Reload',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    />

    <ContextGroup
      :props="{
        type: 'group',
        label: 'Video Controls',
        showLabel: true,
      }"
    >
      <ContextOption
        :props="{
          type: 'action',
          label: 'Rewind',
          init: () => console.log('Test'),
          disabled: false,
          hotkey: {
            mac: 'alt',
            combination: '+ T',
          },
          icon: RewindSvg,
        }"
      >
        <ContextOption
          :props="{
            label: 'Testzzz',
            type: 'action',
            init: () => console.log('Test'),
            disabled: true,
          }"
        />
        <ContextOption
          :props="{
            label: 'Testzz1',
            type: 'action',
            init: () => console.log('Test'),
            disabled: true,
          }"
        />
      </ContextOption>
      <ContextOption
        :props="{
          label: 'Cut',
          type: 'action',
          init: () => {
            console.log('Test');
            return true;
          },
          disabled: false,
          icon: CutSvg,
        }"
      />
      <ContextOption
        :props="{
          label: 'Mute',
          type: 'action',
          init: () => console.log('Test'),
          disabled: false,
          icon: MuteSvg,
        }"
      />
    </ContextGroup>

    <ContextOption
      :props="{
        label: 'Test12131',
        type: 'action',
        init: () => console.log('Test'),
        openHoverMenuWhenDisabled: true,
        disabled: true,
      }"
    >
      <ContextOption
        :props="{
          label: 'Testzz121z',
          type: 'action',
          init: () => console.log('Test'),
          disabled: true,
        }"
      />
    </ContextOption>
    <!-- <ContextOption
      :props="{
        type: 'slot',
        parentSlot: 'Test',
        label: 'Test2',
      }"
    >
      <template #Test>
        <div>Hello from slot</div>
      </template>
    </ContextOption> -->
  </ContextMenu>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: white;
  font-family: "Nanum Gothic", sans-serif;
}
</style>
