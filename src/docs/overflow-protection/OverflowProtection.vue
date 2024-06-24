<template>
  <div id="overflow" class="example overflow">
    <Markdown :md="md" />
  </div>
  <ContextMenu
    id="overflow-protection"
    area=".example.overflow"
    :overflowProtection="false"
  >
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }">
        <ContextOption :props="{ label: 'Rotate 180deg' }">
          <ContextOption :props="{ label: 'Rotate 270deg' }" />
        </ContextOption>
      </ContextOption>
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "@/Components";
import md from "./OverflowProtection.md?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
import Markdown from "../Markdown.vue";

const RotateProps = {
  label: "Rotate211412",
  disabled: false,
  icon: MuteSvg,
};
</script>
