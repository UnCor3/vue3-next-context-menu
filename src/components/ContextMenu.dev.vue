<script setup lang="ts">
import { useContextMenu, setInstance, instances } from "@/store";
import { normalizeOptions } from "@/utils/normalizeOptions";
import { provide, onMounted, watch, ref, inject } from "vue";
import { defaultInstanceName } from "@/constants";
import type { Options } from "@/types";
import { logWarn } from "@/helpers";
import Ctx from "@/CtxAnimated.vue";

const props = withDefaults(defineProps<Options>(), {
  overflowProtection: true,
  id: "default",
});

const shouldRender = ref(true);

// if (instances[defaultInstanceName]) {
//   logWarn(
//     "You are trying to use multiple ContextMenu components in the same app. This library is not tested for this use case, open an issue if want this feature"
//   );
// }
setInstance(props.id);

normalizeOptions(props);

provide("isCtxMenu", true);
provide("usedLabels", []);
provide("instanceId", props.id);

onMounted(() => {
  //seems to be the ony way to watch for destroyed
  watch(
    () =>
      useContextMenu(inject("instanceId", props.id)).state.value!.__destroyed,
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
