<template>
  <ul ref="element" class="hover-menu">
    <template v-for="child in children">
      <CtxOptions
        v-if="typeof child == 'object'"
        :props="{ ...child }"
        :isOpen="isOpen"
        :root="false"
      />
      <slot v-else :name="child" :props="{ isOpen }" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import CtxOptions from "./CtxOptions.vue";
import { ActionChild } from "./types";
import { ref } from "vue";

const element = ref<HTMLElement>();

defineExpose({
  element,
});

defineProps({
  children: {
    type: Array as () => (ActionChild | string)[],
    required: true,
    default: () => [],
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  root: {
    type: Boolean,
    required: true,
  },
});
</script>
