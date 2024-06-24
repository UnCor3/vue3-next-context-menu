<template>
  <span v-if="doesExist(Object.keys($slots), 'Icon')">
    <slot name="Icon" />
  </span>
  <span
    v-else-if="
      //@ts-ignore
      props.icon
    "
    class="icon"
    v-html="
      //@ts-ignore
      props.icon
    "
  />
  <span
    class="icon"
    v-if="
      //@ts-ignore
      !doesExist(Object.keys($slots), 'Icon') &&
      //@ts-ignore
      !props.icon &&
      //@ts-ignore
      props.preserveIconSpace
    "
  />

  <span v-if="doesExist(Object.keys($slots), 'Label')">
    <slot name="Label" />
  </span>
  <span class="label" v-else>
    {{ props.label }}
  </span>

  <span v-if="doesExist(Object.keys($slots), 'Hotkey')">
    <slot name="Hotkey" />
  </span>
  <span
    v-else-if="
      //@ts-ignore
      props.type !== 'group' && props.hotkey
    "
    class="hotkey"
  >
    <template
      v-if="
        //@ts-ignore
        props.hotkey.mac
      "
    >
      <Command
        v-if="
          //@ts-ignore
          props.hotkey.mac === 'command'
        "
      />

      <Alt
        v-if="
          //@ts-ignore
          props.hotkey.mac === 'alt'
        "
      />
    </template>
    {{
      //@ts-ignore
      props.hotkey.combination
    }}</span
  >

  <!-- @vue-expect-error // not important as it will be undefined-->
  <span
    v-if="props.switch && doesExist(Object.keys($slots), 'Switch')"
    :class="{
      //@ts-ignore
      checked: props.switch.isActive,
    }"
  >
    <Tick />
  </span>

  <span
    v-else-if="
      //@ts-ignore
      props.switch
    "
    class="check"
    :class="{
      //@ts-ignore
      checked: props.switch.isActive,
    }"
  >
    <Tick />
  </span>

  <span
    class="sign"
    v-if="
      //@ts-ignore
      !props.switch
    "
    :class="{
      hidden: noChild,
    }"
  >
    <ArrowRight />
  </span>
</template>
<script setup lang="ts">
import { Action } from "@/types";
import ArrowRight from "./icons/ArrowRight.vue";
import Command from "@/icons/Command.vue";
import Alt from "@/icons/Alt.vue";
import Tick from "@/icons/Tick.vue";

const { props, noChild } = defineProps<{
  props: Action;
  noChild: boolean;
}>();

const doesExist = (slots: Array<string>, slotToFind: string) =>
  slots.includes(slotToFind);
</script>
