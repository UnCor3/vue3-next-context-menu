<template>
  <span
    class="icon"
    v-html="
      //@ts-ignore
      props.icon
    "
  />
  <span class="label">
    {{ props.label }}
  </span>
  <span v-if="props.type !== 'group' && props.hotkey" class="hotkey">
    <template v-if="props.hotkey.mac">
      <Command v-if="props.hotkey.mac === 'command'" />

      <Alt v-if="props.hotkey.mac === 'alt'" />
    </template>
    {{ props.hotkey.combination }}</span
  >
  <!-- @vue-expect-error // not important as it will be undefined-->
  <span class="checked" v-if="props.enabled"> <Tick /> </span>
  <!-- @vue-expect-error // not important as it will be undefined-->
  <span
    class="sign"
    :class="{
      hidden: !props.children,
    }"
    ><ArrowRight
  /></span>
</template>
<script setup lang="ts">
import { Action } from "@/types";
import ArrowRight from "./icons/ArrowRight.vue";
import Command from "@/icons/Command.vue";
import Alt from "@/icons/Alt.vue";
import Tick from "@/icons/Tick.vue";

const { props } = defineProps<{
  props: Action;
}>();
</script>
