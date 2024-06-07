<script setup lang="ts">
import { useContextMenu } from "@/store";
import { onMounted } from "vue";
import Casual from "@/docs/Casual.vue";

onMounted(() => {
  const { api } = useContextMenu();

  api.on("open", () => {
    api.highlight("Navigation Controls", "last", true);
  });
});
</script>

<template>
  <Casual />
  <UsingGroup />
  <!-- <ContextOption
      :props="{
        type: 'slot',
        parentSlot: 'Test',
        label: 'Test2',
      }"
    >
      <template #Test>
        <div>Hello from slot</div>
      </template>
    </ContextOption> -->
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  height: 100vh;
  background-color: white;
  font-family: "Nanum Gothic", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.example {
  position: relative;
  height: 50vh;
  background-color: rgba(37, 33, 33, 0.526);

  &::before {
    content: "Right click here";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    /* height: 100%; */
    transform: translateY(-50%);
    text-align: center;
    font-size: 1.5rem;
    color: #495057;
  }
}
</style>
