<script setup lang="ts">
import OverflowProtection from "@/docs/overflow-protection/OverflowProtection.vue";
import TemplatesOnSlot from "@/docs/templates-on-slot/TemplatesOnSlot.vue";
import NestingOption from "@/docs/nesting-option/NestingOption.vue";
import Installation from "@/docs/installation/Installation.vue";
import UsageInNuxt from "@/docs/usage-in-nuxt/UsageInNuxt.vue";
import UsingSwitch from "@/docs/using-switch/UsingSwitch.vue";
import UsingGroup from "@/docs/using-group/UsingGroup.vue";
import RealWorld from "@/docs/real-world/RealWorld.vue";
import Templates from "@/docs/templates/Templates.vue";
import Instances from "@/docs/instances/Instances.vue";
import Caveats from "@/docs/caveats/Caveats.vue";
import Casual from "@/docs/casual/Casual.vue";
import Props from "@/docs/props/Props.vue";
import Intro from "@/docs/intro/Intro.vue";
import Api from "@/docs/api/Api.vue";
import "highlight.js/styles/github-dark.css";
import { useContextMenu } from "@/store";
import { onMounted } from "vue";

onMounted(() => {
  const { api } = useContextMenu();

  api.on("open", () => {
    api.highlight("Navigation Controls", "last", true);
  });
});
</script>

<template>
  <Intro />
  <Installation />
  <Casual />
  <NestingOption />
  <UsingGroup />
  <Templates />
  <UsingSwitch />
  <TemplatesOnSlot />
  <RealWorld />
  <Instances />
  <Api />
  <Props />
  <UsageInNuxt />
  <Caveats />
  <OverflowProtection />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap");
body {
  min-height: 100vh;
  font-family: "Nanum Gothic", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #0d1117;
  color: white;
}

#app {
  margin: auto;
  max-width: 1200px;
}

.example {
  position: relative;
  margin: auto;
  margin-top: 5rem;
  background-color: rgba(37, 33, 33, 0.526);
  &.no-click::before {
    display: none;
  }
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
