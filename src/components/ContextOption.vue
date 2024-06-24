<script setup lang="ts">
import { inject, getCurrentInstance, provide } from "vue";
import CtxOptions from "@/CtxOptions.vue";
import { Action } from "@/types";

const { props } = defineProps<{
  props: Action;
}>();

const parentDepth = inject("depth", 0);
const depth = parentDepth + 1;
const instance = getCurrentInstance();
provide("depth", depth);

const root =
  instance?.parent?.type.__name == "CtxAnimated" ||
  ((inject("root", false) as Boolean) && depth < 2);

const slotNames = Object.keys(instance!.slots);
</script>

<template>
  <!-- @vue-expect-error ts thinks it's smart -->
  <CtxOptions :props="{ type: 'action', ...props }" :root="!!root">
    <!-- @vue-expect-error -->
    <template
      v-for="name in slotNames.filter((s) =>
        props.switch ? s !== 'default' : s
      )"
      v-slot:[name]="data"
    >
      <slot :name="name" v-bind="data" />
    </template>
  </CtxOptions>
</template>
