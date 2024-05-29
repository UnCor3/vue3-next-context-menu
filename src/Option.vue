<template>
  <ul
    ref="element"
    class="hover-menu"
    :class="{
      'no-child': !children.length,
    }"
  >
    <template v-for="child in children">
      <CtxOptions :props="child" :root="false" />
    </template>
  </ul>
</template>

<script setup lang="ts">
import CtxOptions from "@/CtxOptions.vue";
import { ActionChild, Slotname } from "@/types";
import { ref } from "vue";

const element = ref<HTMLElement>();

defineExpose({
  element,
});

defineProps({
  children: {
    type: Array as () => (ActionChild | Slotname)[],
    required: true,
    default: () => [],
  },
});
</script>
