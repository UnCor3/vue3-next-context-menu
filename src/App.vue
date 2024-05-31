<script setup lang="ts">
import ContextMenu from "./ContextMenu.vue";
import ContextOption from "@/components/ContextOption.dev.vue";
import { ContextGroup } from "./Components";
import RewindSvg from "@/icons/Rewind.svg?raw";
import CutSvg from "@/icons/Cut.svg?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
import { ref } from "vue";
import { Action } from "@/types";

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
        type: 'action',
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
        <ContextGroup
          :props="{
            type: 'group',
            label: 'Test11',
          }"
        >
          <ContextOption
            :props="{
              type: 'action',
              label: 'Test5',
              init: () => console.log('Test'),
              disabled: false,
            }"
          /><ContextOption
            :props="{
              type: 'action',
              label: 'Test6',
              init: () => console.log('Test'),
              disabled: false,
            }"
          >
            <ContextGroup
              :props="{
                type: 'group',
                label: 'Test1123112',
              }"
            >
              <ContextOption
                :props="{
                  type: 'action',
                  label: 'Test7',
                  init: () => console.log('Test'),
                  disabled: false,
                }"
              />
            </ContextGroup>
          </ContextOption>
        </ContextGroup>
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
        disabled: true,
      }"
    >
      <template #Icon>
        <div>Icon</div>
      </template>
      <template #Label>
        <div>Label</div>
      </template>
      <template #Hotkey>
        <div>Hotkey</div>
      </template>
    </ContextOption>
    <ContextOption
      :props="{
        type: 'slot',
        parentSlot: 'Test',
        label: 'Test2',
      }"
    >
      <template #Test>
        <div>Hello from slot</div>
      </template>
    </ContextOption>
    <ContextOption :props="testProps">
      <!-- <ContextOption
        :props="{
          type: 'action',
          label: 'Test2111asd',
          init: (props) => console.log(props),
        }"
      /> -->
    </ContextOption>
  </ContextMenu>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: white;
  font-family: "Nanum Gothic", sans-serif;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul {
  list-style: none;
}
</style>
