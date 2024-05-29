<template>
  <slot />
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, inject, reactive, provide } from "vue";
import { ActionGroup, ActionChild } from "@/types";
import { useContextMenu } from "@/store";
import { Action } from "@/types";
import { checkLabelExists } from "@/utils";

const isCtxMenu = inject("isCtxMenu");
if (!isCtxMenu) throw new Error("ContextGroup must be a child of ContextMenu");

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

const { props } = defineProps<{
  props: Action;
}>();

if (!props) {
  throw new Error("You need to provide props");
}

const { state } = useContextMenu();

let modifiedProps: Action;

const getAction = (action: Action) => {
  if (action.type === "slot") {
    modifiedProps = reactive(action);
    return;
  }
  props.type = "action";
  modifiedProps = reactive(action);
  return;
};

getAction(props);

checkLabelExists(props.label);

if (contextOption) {
  contextOption.push(modifiedProps!);
} else if (groupActions) {
  groupActions.push(modifiedProps!);
} else {
  state.value.actions.push(modifiedProps!);
}

onMounted(() => {
  if (contextOption) {
    onUnmounted(() => {
      if (typeof contextOption.get().children === "undefined") return;
      //todo getaction
      const index = contextOption.get().children!.indexOf(modifiedProps);
      //todo getaction
      //@ts-ignore
      contextOption.get().children.splice(index, 1);
    });
  }

  if (handle.get().children.length > 0) {
    //todo ts
    //@ts-ignore
    if (props.type === "slot") return;
    //@ts-ignore
    props.children = handle.get().children;
  }

  //todo getaction
  //only need this if it is not a group
  groupActions &&
    onUnmounted(() => {
      //todo ts
      //@ts-ignore
      const index = groupActions.get().children.indexOf(getAction(props));
      //todo ts
      //@ts-ignore
      groupActions.get().children.splice(index, 1);
    });

  !groupActions &&
    !contextOption &&
    onUnmounted(() => {
      //filtering trough reference does not work idk why
      //so had to first find the index and then filter it
      //TODO
      const optionIndex = state.value.actions.indexOf(props);
      state.value.actions.splice(optionIndex, 1);
    });
});
</script>
