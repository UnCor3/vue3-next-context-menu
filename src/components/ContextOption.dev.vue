<script setup lang="ts">
import { inject, getCurrentInstance } from "vue";
import { unusableSlotNames } from "@/constants";
import CtxOptions from "@/CtxOptions.vue";
import { Action } from "@/types";
import { logWarn } from "@/helpers";

const { props } = defineProps<{
  props: Action;
}>();

const instance = getCurrentInstance();

const root =
  instance?.parent?.type.__name == "CtxAnimated" || (inject("root") as boolean);

const isBadSlotName =
  props.type === "slot" &&
  unusableSlotNames.includes(props.parentSlot || props.parentSlot || "");

if (isBadSlotName)
  logWarn(
    "You are using a reserved slot name with a slot type action. This will not work as expected."
  );

const slotNames = Object.keys(instance!.slots);
//@ts-ignore
if (slotNames.includes("default") && props.switch) {
  logWarn(
    `You are trying to pass child to a switch action with label ${props.label}. This will not work as expected. Passing comments can also cause this issue`
  );
}
</script>

<template>
  <CtxOptions :props="props" :root="root">
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
