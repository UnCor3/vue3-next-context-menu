<template>
  <div class="vue-3-context-hover-menus" :class="theme" />
  <div class="vue-3-context-menu" :class="theme">
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
        <slot />
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useContextMenu } from "@/store";
import { ref, computed } from "vue";
const props = defineProps<{
  theme: "light" | "dark";
}>();
const { state } = useContextMenu();

const theme = computed(() => {
  if (props.theme === "dark") {
    return { dark: true };
  }
  return { light: true };
});

const ctxRef = ref<HTMLElement>();
defineExpose({
  elm: ctxRef,
});
</script>

<style>
.vue-3-context-menu {
  /* color: white !important; */
}
</style>

<style lang="scss">
@mixin box-shadow {
  -webkit-box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.5);
}

.vue-3-context-menu {
  &.light {
    .context-menu {
      background-color: white;
      color: black;
    }
  }

  &.dark {
    .context-menu {
      background-color: black;
      color: white;
    }
  }
  .context-menu {
    visibility: hidden;
    @include box-shadow;
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

.vue-3-context-hover-menus {
  &.dark {
    .hover-menu {
      background-color: black;
      color: white;
    }
  }

  &.light {
    .hover-menu {
      background-color: white;
      color: black;
    }
  }
  .hover-menu {
    @include box-shadow;
  }
}
</style>
