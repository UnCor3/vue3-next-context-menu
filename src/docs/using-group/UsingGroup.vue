<template>
  <div class="example group">
    <Markdown :md="md" />
  </div>
  <ContextMenu id="using-group" area=".example.group">
    <ContextGroup :props="GroupProps">
      <ContextOption :props="RewindProps" />
      <ContextOption :props="CutProps" />
      <ContextOption :props="MuteProps" />
    </ContextGroup>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextGroup, ContextOption, ContextMenu } from "@/Components";
import RewindSvg from "@/icons/Rewind.svg?raw";
import CutSvg from "@/icons/Cut.svg?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
import Markdown from "../Markdown.vue";
import md from "./UsingGroup.md?raw";

const GroupProps = {
  label: "Video Controls",
  showLabel: true,
};

const RewindProps = {
  label: "Rewind",
  init: () => console.log("Test"),
  disabled: false,
  hotkey: {
    mac: "alt",
    combination: "+ T",
  },
  icon: RewindSvg,
};

const CutProps = {
  label: "Cut",
  init: () => {
    console.log("Test");
    return true;
  },
  disabled: false,
  icon: CutSvg,
};

const MuteProps = {
  label: "Mute",
  init: () => console.log("Test"),
  disabled: false,
  icon: MuteSvg,
};
</script>
