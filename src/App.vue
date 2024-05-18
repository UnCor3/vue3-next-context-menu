<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContextMenu from "./ContextMenu.vue";
import Test from "./Test.vue";
import ContextOption from "@/components/ContextOption.vue";
import ContextGroup from "./components/ContextGroup.vue";

// import ContextGroup from "./components/ContextGroup.vue";
// import ContextElm from "./components/ContextElm.vue";
const area = document.body;
const shouldRender = ref(true);

onMounted(() => {
  setTimeout(() => {
    shouldRender.value = false;
  }, 1000);
  setTimeout(() => {
    shouldRender.value = true;
  }, 2000);
});
</script>

<template>
  <ContextMenu :area="area">
    <ContextGroup>
      <ContextOption
        :props="{
          label: 'Test1111',
          init: () => console.log('Test'),
          hotkey: {
            mac: 'command',
            combination: 'Ctrl+T',
          },
          disabled: true,
          enabled: true,
          children: [
            {
              label: 'Test1111',
              type: 'action',
              init: () => console.log('Test'),
            },
          ],
        }"
      />

      <ContextOption
        :props="{
          label: 'Testaaaa',
          init: () => console.log('Test'),
          hotkey: {
            mac: 'alt',
            combination: 'Alt+T',
          },
          children: [
            {
              label: 'Testaaaa',
              type: 'action',
              init: () => console.log('Test'),
            },
          ],
        }"
      />

      <ContextOption :props="'Test'" />
    </ContextGroup>
    <ContextOption :props="'Test1'" />

    <template #Test1>
      <div>gavuraaa</div>
    </template>
    <template #Test="props">
      <Test :contextMenuProps="props" />
    </template>
  </ContextMenu>
  <!-- <ContextOption
    v-if="shouldRender"
    :props="{
      label: 'Test1111',
      init: () => console.log('Test'),
      hotkey: 'Ctrl+T',
      children: [
        {
          label: 'Test1111',
          type: 'action',
          init: () => console.log('Test'),
          hotkey: 'Ctrl+TA',
        },
      ],
    }"
  /> -->
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
body {
  height: 100vh;
}
</style>
