<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContextMenu from "./ContextMenu.vue";
import Test from "./Test.vue";
import ContextOption from "@/components/ContextOption.vue";
import ContextGroup from "./components/ContextGroup.vue";
import type { Action } from "@/types";
import RewindSvg from "@/icons/Rewind.svg?raw";

// import ContextGroup from "./components/ContextGroup.vue";
// import ContextElm from "./components/ContextElm.vue";
const area = document.body;
const shouldRender = ref(true);
// setTimeout(() => {
//   contextApi.highlight("Test1111", "middle");
// }, 3000);

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
    <ContextOption
      :props="{
        label: 'Back',
        init: () => console.log('Test'),
        disabled: false,
      }"
    >
      <ContextOption
        :props="{
          label: 'Testbbbb',
          init: () => console.log('Test'),
          hotkey: {
            mac: 'command',
            combination: 'Ctrl+T',
          },
          disabled: true,
        }"
      />
    </ContextOption>
    <ContextOption
      :props="{
        label: 'Forward',
        init: () => console.log('Test'),
      }"
    />
    <ContextGroup
      :props="{
        label: 'Video-controls',
        type: 'group',
      }"
    >
      <ContextOption
        :props="{
          label: 'Rewind',
          icon: RewindSvg,
          init: () => console.log('Test'),
        }"
      />
    </ContextGroup>
    <template v-for="i in 20">
      <ContextOption
        :props="{
          type: 'action',
          init: () => console.log('Action 1.1'),
          label: `Action ${i}`,
          hotkey: {
            combination: '+ T',
            mac: 'command',
          },
          children: [
            //@ts-ignore
            generateNestedObjects(0, 20),
          ],
        }"
      />
    </template>
    <ContextOption
      :props="{
        label: 'Action ${i}',
        init: () => console.log('Test'),
        disabled: true,
        children: [
          {
            label: 'Testaaaasdaa',
            type: 'action',
            init: () => console.log('Test'),
          },
        ],
      }"
    />
    <ContextGroup :props="{ label: 'Test-label', type: 'group' }">
      <ContextOption :props="TestProps" />

      <!-- <ContextOption
        :props="{
          type: 'slot',
          label: 'Test1',
          hotkey: {
            mac: 'alt',
            combination: 'Alt+T',
          },
        }"
      /> -->
      <ContextOption
        :props="{
          type: 'slot',
          label: 'Testyyy',
          parentSlot: 'Testyyy',
          childSlot: 'Test1',
          hotkey: {
            mac: 'alt',
            combination: 'Alt+T',
          },
        }"
      >
      </ContextOption>
    </ContextGroup>

    <template #Test1>
      <div style="color: white">gavuraaa</div>
    </template>
    <template #Testyyy="props">
      <Test :contextMenuProps="props" />
    </template>
  </ContextMenu>
  <button
    @click="
      () => {
        shouldRender = false;
      }
    "
  >
    Set
  </button>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: black;
  font-family: "Nanum Gothic", sans-serif;
}
</style>
