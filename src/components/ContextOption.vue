<script setup lang="ts">
import { inject, getCurrentInstance } from "vue";
import CtxOptions from "@/CtxOptions.vue";
import { Action } from "@/types";

const { props } = defineProps<{
  props: Action;
}>();

const instance = getCurrentInstance();

const root =
  instance?.parent?.type.__name == "CtxAnimated" || (inject("root") as boolean);
</script>

<template>
  <CtxOptions :props="props" :root="root">
    <template v-for="(_, name) in $slots" v-slot:[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </CtxOptions>
</template>
