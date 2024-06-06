<script setup lang="ts">
import ContextMenu from "./Context-Menu.vue";
import { useContextMenu } from "@/store";
import { onMounted } from "vue";
const div = document.createElement("div");
div.className = "foo";
div.innerText = "Right click me";

const div2 = document.createElement("div");
div2.className = "foo2";
div2.innerText = "Right click me 2";

document.body.append(div, div2);

onMounted(() => {
  const { api } = useContextMenu("hello");

  api.on("open", () => {
    api.highlight("Navigation Controls", "last", true);
  });
});
</script>

<template>
  <ContextMenu :div-ref="div" id="default" />
  <div>A simple element looks like so</div>
  <ContextMenu :div-ref="div2" id="hello" theme="white"> </ContextMenu>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: white;
  font-family: "Nanum Gothic", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
