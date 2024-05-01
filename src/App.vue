<script setup lang="ts">
import { ref } from "vue";
import ContextMenu from "./ContextMenu.vue";
import Test from "./Test.vue";
import ContextOption from "@/components/ContextOption.vue";

// import ContextGroup from "./components/ContextGroup.vue";
// import ContextElm from "./components/ContextElm.vue";
const area = document.body;
const shouldRender = ref(true);
</script>

<template>
  <ContextMenu
    :actions="[
      {
        label: 'Test',
        type: 'action',
        init: () => console.log('Test'),
        children: ['Test'],
        hotkey: 'Ctrl+T',
      },
      {
        label: 'Foo',
        type: 'action',
        init: () => console.log('Foo'),
        children: [
          {
            label: 'Bar',
            type: 'action',
            init: () => console.log('Bar'),
            children: [
              {
                label: 'Baz',
                type: 'action',
                init: () => console.log('Baz'),
                children: [
                  {
                    label: 'Baz',
                    type: 'action',
                    init: () => console.log('Baz'),
                    children: [
                      {
                        label: 'Baz',
                        type: 'action',
                        init: () => console.log('Baz'),
                        children: [
                          {
                            label: 'Baz',
                            type: 'action',
                            init: () => console.log('Baz'),
                            children: [
                              {
                                label: 'Baz',
                                type: 'action',
                                init: () => console.log('Baz'),
                                children: [
                                  {
                                    label: 'Baz',
                                    type: 'action',
                                    init: () => console.log('Baz'),
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'HELLO',
        type: 'group',
        children: [
          {
            label: 'GTest',
            init: () => console.log('Test'),
            type: 'action',
            children: [
              {
                label: 'Test1',
                init: () => console.log('Test'),
                type: 'action',
              },
            ],
          },
          {
            label: 'GTest2',
            type: 'action',
            init: () => console.log('Test1'),
            children: [
              {
                label: 'Test3',
                init: () => console.log('Test'),
                type: 'action',
                children: [
                  {
                    label: 'Test4',
                    init: () => console.log('Test'),
                    type: 'action',
                  },
                ],
              },
            ],
          },
        ],
      },
      'Test1',
    ]"
    :area="area"
  >
    <template #Test="props">
      <Test :contextMenuProps="props" />
    </template>
    <template #Test1>
      <div>gavuraaa</div>
    </template>
  </ContextMenu>
  <ContextOption
    :props="{
      label: 'Test1111',
      type: 'action',
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
  />
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
