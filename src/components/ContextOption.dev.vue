<script setup lang="ts">
import { logWarn, logError, checkIfValid } from "@/helpers";
import { inject, getCurrentInstance, provide } from "vue";
import { unusableSlotNames } from "@/constants";
import CtxOptions from "@/CtxOptions.vue";
import { Action } from "@/types";
import { useContextMenu } from "@/store";

const { props } = defineProps<{
  props: Action;
}>();

const { state } = useContextMenu(inject("instanceId", "default"));

const parentDepth = inject("depth", 0);
const depth = parentDepth + 1;
const instance = getCurrentInstance();
provide("depth", depth);

//@ts-ignore it cant be a group because this file is ContextOption
if (!props.init) {
  logWarn(
    `You are using an action without an init function, label was ${props.label}. If this was intentional, ignore this warning.`
  );
}

const root =
  instance?.parent?.type.__name == "CtxAnimated" ||
  ((inject("root", false) as Boolean) && depth < 2);

if (depth > 2 && state.value!.overflowProtection) {
  logError(`
    You are trying to go more than 2 levels deep, with overflowProtection enabled this cannot be done. Pass overflowProtection: false to the ContextMenu component in order to go more than 2 levels deep, label was ${props.label}.
  `);
}

checkIfValid(props);

const isBadSlotName =
  props.type === "slot" &&
  unusableSlotNames.includes(props.parentSlot || props.parentSlot || "");

if (isBadSlotName)
  logWarn(
    `You are using a reserved slot name with a slot type action label was ${props.label}. This will not work as expected.`
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
