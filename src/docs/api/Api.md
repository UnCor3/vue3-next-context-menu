### Context Api

#### You can use the api to control the context menu. You can highlight an action, close,open,destroy the context menu, and listen to events.

- ### Usage in a component

```ts
<template>
  <ContextMenu id="api" area=".example.api">
    <ContextOption :props="apiProps" />
  </ContextMenu>
  <button @click="destroy">Destroy me</button>
</template>
<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import { useContextMenu } from "vue3-next-context-menu";
import { onMounted, ref } from "vue";

const destroy = ref(() => {});

onMounted(() => {
  //if you use multiple instances
  //you need to provide an id to the ContextMenu
  //even though i use single instance i provided an id
  const { api } = useContextMenu("api");
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

  api.on("destroy", () => alert("destroyed"));

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
```

- ### Types

```ts
  /**
   * Registers an event listener for the specified event.
   * @param event - The event name.
   * @param cb - The callback function to be executed when the event is triggered.
   */
  on(
    event: "close" | "open" | "openAt" | "toggle" | "destroy" | "highlight",
    cb: Function
  ): void;

  /**
   * Closes the context menu.
   */
  close(): void;

  /**
   * Opens the context menu.
   */
  open(): void;

  /**
   * Opens the context menu at the specified coordinates.
   * @param x - The x-coordinate.
   * @param y - The y-coordinate.
   */
  openAt(x: number, y: number): void;

  /**
   * Toggles the state of the context menu.
   */
  toggle(): void;

  /**
   * Destroys the context menu.
   */
  destroy(): void;

  /**
   * Highlights the specified label in the context menu.
   * @param label - The label to be highlighted.
   * @param at - The position to highlight the label at.
   * @param forceOpen - Specifies whether to force the context menu to open defaults to true
   */
  highlight(
    label: string,
    at:
      | "middle"
      | "last" //last positions of the context menu
      | {
          x: number;
          y: number;
        },
    forceOpen?: boolean
  ): void;
```
