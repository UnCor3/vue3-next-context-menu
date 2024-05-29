<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContextMenu from "./ContextMenu.vue";
import ContextOption from "@/components/ContextOption.vue";
import type { Action } from "@/types";
import { ContextGroup } from "./Components";

// import ContextGroup from "./components/ContextGroup.vue";
// import ContextElm from "./components/ContextElm.vue";
const area = document.body;
const shouldRender = ref(true);
// setTimeout(() => {
//   contextApi.highlight("Test1111", "middle");
// }, 3000);

//@ts-ignore
const TestProps = {
  type: "action",
  label: "Testaaaa1",
  init: () => console.log("Test"),
  hotkey: {
    mac: "alt",
    combination: "Alt+T",
  },
  disabled: true,
  children: [
    {
      label: "Testaaaa",
      type: "action",
      init: () => console.log("Test"),
    },
  ],
} as Action;

// setTimeout(() => {
//   TestProps.value.label = "Testaaaa4";
//   TestProps.value.disabled = false;
// }, 2000);

onMounted(() => {
  setTimeout(() => {
    shouldRender.value = false;
  }, 1000);
  // setTimeout(() => {
  //   shouldRender.value = true;
  // }, 2000);
});

//@ts-ignore
function generateNestedObjects(depth: number, maxDepth: number) {
  let baseObject = {
    type: "action",
    init: () => console.log(`Action 1.${depth}`),
    label: `Action 1.${depth}`,
    hotkey: {
      combination: "ctrl+a",
      mac: "command",
    },
    children: [],
  };

  if (depth < maxDepth) {
    //@ts-ignore
    baseObject.children.push(generateNestedObjects(depth + 1, maxDepth));
  }

  return baseObject;
}
</script>

<template>
  <ContextMenu :area="area">
    <!-- <ContextOption
      :props="{
        label: 'aa',
        init: () => console.log('Test'),
        disabled: false,
      }"
    /> -->
    <ContextGroup
      :props="{
        type: 'group',
        label: 'Test',
      }"
    >
      <ContextOption
        :props="{
          type: 'action',
          label: 'Test4',
          init: () => console.log('Test'),
          disabled: false,
        }"
      />
    </ContextGroup>
    <ContextOption
      :props="{
        label: 'Test1',
        type: 'action',
        init: () => console.log('Test'),
        disabled: false,
      }"
    />
  </ContextMenu>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: black;
  font-family: "Nanum Gothic", sans-serif;
}
</style>
