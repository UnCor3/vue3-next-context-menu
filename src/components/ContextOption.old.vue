<template>
  <li
    class="context-option"
    :class="{
      clickable: !props.children,
    }"
    ref="liRef"
  >
    <span class="label">
      {{ props.label }}
    </span>
    <span class="sign" v-if="props.children"><ArrowRight /></span>

    <Teleport to="body">
      <ul class="hover-menu" v-if="props.children" ref="ulRef">
        <!-- <slot
            v-if="props.slot"
            :name="props.slot"
            :props="{ isOpen: props.isOpen }"
          /> -->
        <template v-for="child in props.children">
          <!-- <CtxOptions
            v-if="typeof child == 'object'"
            :props="{ ...child }"
            :isOpen="isOpen"
          /> -->
          <!-- <slot v-else :name="child" :props="{ isOpen }" /> -->
        </template>
      </ul>
    </Teleport>
  </li>
</template>
<script setup lang="ts">
import type { ActionChild } from "../types";
import ArrowRight from "../icons/ArrowRight.vue";

type OptionsProps = {
  props: ActionChild;
  isOpen: boolean;
};

defineProps<OptionsProps>();
</script>
