<template>
  <div id="context-api" class="example api">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="api" area=".example.api">
    <ContextOption :props="apiProps" />
  </ContextMenu>
  <div style="width: 100%">
    <button @click="destroy()" style="display: block; margin: auto">
      Destroy me
    </button>
  </div>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import { useContextMenu } from "@/store";
import { onMounted, ref } from "vue";
import Markdown from "../Markdown.vue";
import md from "./Api.md?raw";

const destroy = ref(() => {});

onMounted(() => {
  //if you use multiple instances you need to provide an id, in this even though i use single instance i provided an id
  const { api, state } = useContextMenu("api");
  //if you didn't provide an id
  //const {api} = useContextMenu();

  //if you open the context menu it will highlight the action that has label "Hi there"
  api.on("open", () => {
    api.highlight("Hi there", "last");
  });

  //if you close the context menu it will log "closed"
  api.on("close", () => {
    console.log("closed");
  });

  api.on("destroy", () => alert(JSON.stringify(state.value)));

  //manually destroy the context menu
  //useful when you are not conditionally rendering the context menu
  destroy.value = () => api.destroy();
});

const apiProps = {
  label: "Hi there",
  init: () => {
    console.log("Hi there");
  },
};
</script>
