<script setup lang="ts">
import { inject, getCurrentInstance } from "vue";
import CtxOptions from "@/CtxOptions.vue";
import { Action } from "@/types";

const { props } = defineProps<{
  props: Action;
}>();

const instance = getCurrentInstance();

const root =
  instance?.parent?.type.__name == "CtxAnimated" ||
  (inject("root", false) as boolean);

const slotNames = Object.keys(instance!.slots);
</script>

<template>
  <!-- @vue-expect-error ts thinks it's smart -->
  <CtxOptions :props="{ type: 'action', ...props }" :root="root">
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
