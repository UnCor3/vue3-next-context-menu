<script setup lang="ts">
//@ts-nocheck
import { ContextOption, ContextGroup, ContextMenu } from "./Components";
import RewindSvg from "@/icons/Rewind.svg?raw";
import CutSvg from "@/icons/Cut.svg?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
import { useContextMenu } from "./store";
import { watchEffect } from "vue";

defineProps<{
  divRef: HTMLElement;
  id?: string;
  theme?: string;
}>();

// const { state } = useContextMenu();

watchEffect(() => {
  // console.log(state.value);
});
</script>

<template>
  <ContextMenu
    :theme="theme ? theme : 'dark'"
    :area="divRef"
    :overflow-protection="false"
    :id="id"
  >
    <ContextGroup
      :props="{
        label: 'Navigation Controls',
        showLabel: true,
      }"
    >
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
      >
        <ContextOption
          :props="{
            type: 'action',
            label: 'Reload1',
            init: () => console.log('Test'),
            preserveIconSpace: true,
          }"
        >
          <ContextOption
            :props="{
              type: 'action',
              label: 'Reload12',
              init: () => console.log('Test'),
              preserveIconSpace: true,
            }"
          />
        </ContextOption>
      </ContextOption>
    </ContextGroup>
    <ContextOption
      :props="{
        label: 'can it',
      }"
    >
      <ContextOption
        :props="{
          label: 'can it2',
        }"
      >
        <ContextOption
          :props="{
            label: 'can it3',
          }"
        >
          <ContextOption
            :props="{
              type: 'slot',
              label: 'can it13123',
              parentSlot: 'parent',
              childSlot: 'child',
            }"
          >
            <template #child>
              <div>Child</div>
            </template>
            <template #parent>
              <div>Child</div>
            </template>
          </ContextOption>
        </ContextOption>
      </ContextOption>
    </ContextOption>
  </ContextMenu>
</template>
