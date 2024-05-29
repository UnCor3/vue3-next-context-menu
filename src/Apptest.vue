<script setup lang="ts">
//@ts-nocheck

import { createPopper } from "@popperjs/core";
import { preventOverflow, flip } from "@popperjs/core/lib/modifiers";
import { remToPx } from "./helpers";
import { onMounted, ref } from "vue";
const offsetModifier = {
  name: "offset",
  options: {
    offset: [0, remToPx(0.5)],
  },
};

const popperOptions = {
  modifiers: [preventOverflow, flip],
  strategy: "relative",
  placement: "right-start",
};

const liRef = ref<HTMLElement>();
const ulRef = ref<HTMLElement>();

onMounted(() => {
  const popper = createPopper(
    ulRef.value!,
    liRef.value!,
    //@ts-ignore
    popperOptions
  );

  ulRef.value!.addEventListener("mouseover", () => {
    ulRef.value!.setAttribute("data-show", "");
    popper.update();
  });

  ulRef.value!.addEventListener("mouseleave", () => {
    ulRef.value!.removeAttribute("data-show");
    popper.update();
  });
});
</script>

<template>
  <div class="test-ctx">
    <ul ref="ulRef" class="test-ul">
      aaa
      <li ref="liRef" class="test-li">bbb</li>
    </ul>
  </div>
</template>

<style>
#app {
  display: flex;
  align-items: flex-end;
  height: 100vh;
}

.test-ctx {
  width: 20%;
  border: 1px solid black;
  padding: 0;
  margin: 0;
}
.test-ul {
  background-color: red;
  padding: 0;
  margin: 0;
}

.test-li {
  display: none;
  border: 1px solid black;
  padding: 0;
  margin: 0;
}
.test-ul[data-show] .test-li {
  display: block;
}
</style>
