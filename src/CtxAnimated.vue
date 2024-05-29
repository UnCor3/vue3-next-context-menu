<template>
  <div class="vue-3-context-hover-menus"></div>
  <div class="vue-3-context-menu">
    <ul
      class="context-menu"
      tabindex="-1"
      :class="{ visible: state.isOpen }"
      ref="ctxRef"
      :style="{
        left: state.x + 'px',
        top: state.y + 'px',
      }"
    >
      <div style="position: relative">
        <CtxOptions
          v-for="action in state.actions"
          :key="action.label"
          :props="action"
          :root="true"
        >
          <!-- :slot="action.slot" -->
          <template v-for="(_, name) in $slots" v-slot:[name]="data">
            <slot :name="name" v-bind="data"></slot>
          </template>
        </CtxOptions>
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
import CtxOptions from "@/CtxOptions.vue";
import { useContextMenu } from "@/store";
import { defineExpose, ref } from "vue";

const { state } = useContextMenu();

const ctxRef = ref<HTMLElement>();
defineExpose({
  elm: ctxRef,
});
</script>

<style>
.vue-3-context-menu {
  color: white !important;
}
</style>

<style lang="scss">
.vue-3-context-menu {
  .context-menu {
    visibility: hidden;
    background-color: black;
    border: rgba(128, 128, 128, 0.4) 1px solid;
    min-height: 100px;
    min-width: 200px;
    /* z-index: 1002; */
    user-select: none;
    border-radius: 0.5rem;
    position: fixed;
    padding: 0.5rem;
    border-radius: 0.5rem;
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 200px;
  }

  .context-menu:focus {
    outline: none;
  }

  .context-menu.visible {
    visibility: visible;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
