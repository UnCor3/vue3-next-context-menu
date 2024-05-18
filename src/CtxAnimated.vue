<template>
  <div class="context">
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
          :key="action"
          :props="action"
          :isOpen="state.isOpen"
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
.context {
  color: white !important;
}

.context-option {
  display: flex;
  position: relative;
  list-style: none;
  padding: 0.45rem 0.5rem;
  max-width: 100vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 200px;
}

.context-option:hover {
  background-color: rgba(128, 128, 128, 0.4);
  border-radius: 0.25rem;
}

.context-option.clickable {
  cursor: pointer;
}

.context-option .sign {
  height: 100%;
  margin-left: 1rem;
}

.context-option .label {
  width: 100%;
  text-align: left;
}

.hover-menu {
  visibility: hidden;
  opacity: 0;
  scale: 0.98;
  transition: scale ease 0.3s, opacity ease 0.3s;
  border: rgba(128, 128, 128, 0.4) 1px solid;
  background-color: black;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.hover-menu .no-child {
  display: none !important;
}
</style>

<style scoped>
.context-menu {
  visibility: hidden;
  background-color: black;
  border: rgba(128, 128, 128, 0.4) 1px solid;
  min-height: 100px;
  min-width: 100px;
  /* z-index: 1002; */
  user-select: none;
  border-radius: 0.5rem;
  position: fixed;
  padding: 0.5rem;
  border-radius: 0.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.context-menu:focus {
  outline: none;
}

.context-menu.visible {
  visibility: visible;
}
</style>
