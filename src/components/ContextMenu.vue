<script setup lang="ts">
import { useContextMenu, setInstance } from "@/store";
import { normalizeOptions } from "@/utils/normalizeOptions";
import { provide, onMounted, watch, ref } from "vue";
import type { Options } from "@/types";
import Ctx from "@/CtxAnimated.vue";

const props = withDefaults(defineProps<Options>(), {
  overflowProtection: true,
  id: "default",
});

const shouldRender = ref(true);

setInstance(props.id);

normalizeOptions(props);

provide("isCtxMenu", true);
provide("instanceId", props.id);

onMounted(() => {
  //seems to be the ony way to watch for destroyed
  watch(
    () => useContextMenu(props.id).state.value!.__destroyed,
    (render) => {
      shouldRender.value = !render;
    }
  );
});
</script>

<template>
  <Ctx :area="props.area" v-if="shouldRender">
    <slot />
  </Ctx>
</template>
