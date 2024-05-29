<script setup lang="ts">
import { onMounted, inject, reactive, provide } from "vue";
import { ActionGroup, ActionChild } from "@/types";
import { Action } from "@/types";
import CtxOptions from "@/CtxOptions.vue";

const { props, teleportRef } = defineProps<{
  props: Action;
  teleportRef?: string;
}>();

const accumulatedActions = [] as ActionChild[];
const action = reactive({
  children: accumulatedActions,
});
const handle = {
  push: (action: ActionChild) => {
    accumulatedActions.push(action);
  },
  get: () => action,
};

provide("contextOption", handle);

const contextOption = inject("contextOption") as {
  push: (action: Action) => void;
  get: () => ActionGroup;
} | null;

const groupActions = inject("groupActions") as {
  push: (action: Action) => void;
  get: () => ActionGroup;
} | null;

let modifiedProps: Action;

const getAction = (action: Action) => {
  // if (action.type === "slot") {
  //   modifiedProps = ref(action);
  //   return;
  // }
  props.type = "action";
  return;
};

getAction(props);

if (contextOption) {
  // contextOption.push(modifiedProps!);
} else if (groupActions) {
  // groupActions.push(modifiedProps!);
} else {
  // state.value.actions.push(modifiedProps!);
}

onMounted(() => {
  // if (groupActions) {
  //   groupActions.push(props);
  // }
  // if (contextOption) {
  //   onUnmounted(() => {
  //     if (typeof contextOption.get().children === "undefined") return;
  //     //todo getaction
  //     const index = contextOption.get().children!.indexOf(modifiedProps);
  //     //todo getaction
  //     //@ts-ignore
  //     contextOption.get().children.splice(index, 1);
  //   });
  // }
  // if (handle.get().children.length > 0) {
  //   //todo ts
  //   //@ts-ignore
  //   if (props.type === "slot") return;
  //   //@ts-ignore
  //   props.children = handle.get().children;
  // }
  // //todo getaction
  // //only need this if it is not a group
  // groupActions &&
  //   onUnmounted(() => {
  //     //todo ts
  //     //@ts-ignore
  //     const index = groupActions.get().children.indexOf(getAction(props));
  //     //todo ts
  //     //@ts-ignore
  //     groupActions.get().children.splice(index, 1);
  //   });
  // !groupActions &&
  //   !contextOption &&
  //   onUnmounted(() => {
  //     //filtering trough reference does not work idk why
  //     //so had to first find the index and then filter it
  //     //TODO
  //     const optionIndex = state.value.actions.indexOf(props);
  //     state.value.actions.splice(optionIndex, 1);
  //   });
});
console.log(teleportRef);
</script>
<template>
  <Teleport to=".vue-3-context-hover-menus" v-if="contextOption">
    <CtxOptions :props="{ ...props, type: 'action' }">
      <template v-slot="{}">
        {{ JSON.stringify(Test) }}
        <slot :test />
      </template>
    </CtxOptions>
  </Teleport>
  <CtxOptions :props="{ ...props, type: 'action' }" v-else>
    <slot />
  </CtxOptions>
</template>
