## vue3-next-context-menu 📚

- Compatible with Vue3 and Nuxt 🚀
- Uses popper.js under the hood 🎈
- Lightweight and fast ⚡
- Support for multiple instances 🌟
- Dark and light themes 🌓
- Easy to use and customize 🎨

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Context Api](#context-api)
- [Using in Nuxt](#using-in-nuxt)
- [Caveats](#caveats)

#### This library is especially made for web apps similar to canva,figma,codesandbox,codepen,excalidraw etc.

## &nbsp;
- ### Installation

```bash
npm install vue3-next-context-menu
```

or

```bash
yarn add vue3-next-context-menu
```
- ### Usage

### Simple example

```ts
<script lang="ts" setup>
import { ContextOption, ContextGroup, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"


const backProps = {
  label: 'Back',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};

const forwardProps = {
  label: 'Forward',
  init: () => console.log('Test'),
  disabled: true,
  preserveIconSpace: true,
};

const actionProps = {
  label: 'Reload',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};
</script>
<template>
  <ContextMenu theme="light">
    <ContextOption
      :props="backProps"
    />
    <ContextOption
      :props="forwardProps"
    />
    <ContextOption
      :props="actionProps"
    />
  </ContextMenu>
</template>
```
### Nest ContextOption(s) inside a ContextOption

#### If you want to go deeper than this you need to pass `overflowProtection` as false to the ContextMenu component, check it out [here](#overflow).

```ts
<template>
  <ContextMenu>
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }" />
      <ContextOption :props="{ label: 'Rotate 180deg' }" />
      <ContextOption :props="{ label: 'Rotate 270deg' }" />
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import MuteSvg from "@/icons/Mute.svg?raw";
import "vue3-next-context-menu/styles.css"

const RotateProps = {
  label: "Rotate",
  disabled: false,
  icon: MuteSvg,
};
</script>
```
### Using Group

#### You can nest ContextOption(s) inside ContextGroup to group them together. You can also pass showLabel to display the label on the top of the group.You cannot nest ContextGroup(s) inside ContextGroup.

```ts
<template>
  <ContextMenu>
    <ContextGroup :props="GroupProps">
      <ContextOption :props="RewindProps" />
      <ContextOption :props="CutProps" />
      <ContextOption :props="MuteProps" />
    </ContextGroup>
  </ContextMenu>
</template>
<script setup lang="ts">
import { ContextGroup, ContextOption, ContextMenu } from "vue3-next-context-menu/Components";
import "vue3-next-context-menu/styles.css"

//you can also use templates to pass icons check for template usage down below
import RewindSvg from "@/assets/Rewind.svg?raw";
import CutSvg from "@/assets/Cut.svg?raw";
import MuteSvg from "@/assets/Mute.svg?raw";

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
```
### Using templates

#### Using the registered templates you can render any content. 'Icon', 'Label','Hotkey' are the slots available unless you pass `switch` property in the props check next example for that.

```ts
<template>
  <ContextMenu>
    <ContextOption
      :props="{
        label: 'Foo',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    >
      <template #Icon> Icon </template>
      <template #Label>
        <div>Label</div>
      </template>
      <template #Hotkey>
        <div>Hotkey</div>
      </template>
      //Only available if switch property is passed in the props
      // <template #Switch>
      //   <div>Switch</div>
      // </template>
    </ContextOption>
  </ContextMenu>
</template>
<script setup lang="ts">
import { ContextMenu, ContextOption } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"

</script>
```
### Option with type slot

#### Replace both parent and child slot with your own components

```ts
<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"

</script>

<template>
  <ContextMenu id="templates">
    <ContextOption
      :props="{
        type: 'slot',
        label: 'Test',
        parentSlot: 'parent',
        childSlot: 'child',
      }"
    >
      <template #parent>
        <div>Hello from slot</div>
      </template>
      <template #child>
        <div>Hello from child slot</div>
      </template>
    </ContextOption>
  </ContextMenu>
</template>
```
### Using switch type of action

#### If you define a `switch : {isActive : true}` in the props, action will not accept any children and it will render a tick icon if true. You must mutate the isActive property manually because props manipulation by a library isn't a great practice.

```ts
<template>
  <ContextMenu >
    <ContextOption :props="props" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"
import { ref } from "vue";


const props = ref({
  label: "Auto Refresh",
  switch: {
    isActive: true,
  },
  init() {
    this!.switch.isActive = !this!.switch.isActive;
    //return true to keep the context menu open
    return true;
  },
  hotkey: {
    mac: "alt",
    combination: "+ T",
  },
});
</script>
```
### Multiple Instances

#### This library supports multiple instances. All you need is to give ids and different areas to ContextMenus. Also check [api](#Api) usage with multiple instances.

```ts
<template>
  <ContextMenu id="using-ins1" area=".example.ins1">
    <ContextOption :props="ins1" />
  </ContextMenu>
  <ContextMenu id="using-ins2" area=".example.ins2">
    <ContextOption :props="ins2" />
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"


const ins1 = {
  label: "Instance 1",
  init: () => {
    console.log("ins 1");
  },
};

const ins2 = {
  label: "Instance 2",
  init: () => {
    console.log("ins 2");
  },
};
</script>
```
### A Real World Example

```ts
<template>
  <ContextMenu>
    <ContextOption
      :props="{
        label: 'Back',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    />
    <ContextOption
      :props="{
        type: 'action',
        label: 'Forward',
        init: () => console.log('Test'),
        disabled: true,
        preserveIconSpace: true,
      }"
    />
    <ContextOption
      :props="{
        type: 'action',
        label: 'Reload',
        init: () => console.log('Test'),
        preserveIconSpace: true,
      }"
    />
    <ContextGroup
      :props="{
        type: 'group',
        label: 'Video Controls',
        showLabel: true,
      }"
    >
      <ContextOption
        :props="{
          type: 'action',
          label: 'Rewind',
          init: () => console.log('Test'),
          disabled: false,
          hotkey: {
            mac: 'alt',
            combination: '+ T',
          },
          icon: RewindSvg,
        }"
      >
        <ContextOption
          :props="{
            label: 'Testzzz',
            type: 'action',
            init: () => console.log('Test'),
            disabled: true,
          }"
        />
        <ContextOption
          :props="{
            label: 'Testzz1',
            type: 'action',
            init: () => console.log('Test'),
            disabled: true,
          }"
        />
      </ContextOption>
      <ContextOption
        :props="{
          label: 'Cut',
          type: 'action',
          init: () => {
            console.log('Test');
            return true;
          },
          disabled: false,
          icon: CutSvg,
        }"
      />
      <ContextOption
        :props="{
          label: 'Mute',
          type: 'action',
          init: () => console.log('Test'),
          disabled: false,
          icon: MuteSvg,
        }"
      />
    </ContextGroup>
    <ContextOption
      :props="{
        label: 'Test12131',
        type: 'action',
        init: () => console.log('Test'),
        openHoverMenuWhenDisabled: true,
        disabled: true,
      }"
    >
      <ContextOption
        :props="{
          label: 'Testzz121z',
          type: 'action',
          init: () => console.log('Test'),
          disabled: true,
        }"
      />
    </ContextOption>
  </ContextMenu>
</template>
<script setup lang="ts">
import { ContextMenu, ContextOption, ContextGroup } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"
import RewindSvg from "@/icons/Rewind.svg?raw";
import CutSvg from "@/icons/Cut.svg?raw";
import MuteSvg from "@/icons/Mute.svg?raw";
</script>
```
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
### Props

- ### ContextMenu

  - **id?**: `string` - The id of the context menu, needed when using multiple instances.
  - **area?**: `string` - The area where the context menu will be shown, defauts to `document.body`.
  - **overflowProtection?**: `boolean` - If you want to go more than 1 level deep in the context you need pass false, check [here](#overflow). The reason why is this the case establishing a native parent child relationship with separate elements where for example parent gets hovered and child gets hovered as well, is indeed possible but not solid enough to be used in a production environment. Defaults to `true`.

- ### ContextGroup

  - **label**: `string` - The label of the group.
  - **showLabel?**: `boolean` - If you want to show the label of the group, defaults to `false`.

- ### ContextOption

  - **label**: `string` - The label of the action must be unique.

  - **type?**: `"action" | "slot"` - The type of the action, if it's a slot or an action, defaults to `action`.

  - **init**: `(props: Action) => Boolean | void` - The function to be called when the action is clicked, you will get the passed props as params, return truthy to keep the context menu open

  - **disabled?**: `boolean` - Action will be greyed out if disabled is true

  - **hotkey?**:
    This does not work on type slot - `mac?: "command" | "alt"` - The shortcut to be used for the action use mac property for mac shortcut icons - `combination: string`

  - **switch?**: `{
isActive :boolean }` -
    This does not work on type slot, When you pass this prop, the action will be a switch, and you can control the switch with the isActive property.
  - **preserveIconSpace?**: `boolean` - If you want to preserve the icon space even if there is no icon, defaults to `false`.
### Using in Nuxt

#### In Nuxt it you must use the `ClientOnly` component to render the context menu. This is due to the use of Teleport

```ts
<script lang="ts" setup>
import { ContextOption, ContextGroup, ContextMenu } from "vue3-next-context-menu/components";
import "vue3-next-context-menu/styles.css"


const backProps = {
  label: 'Back',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};

const forwardProps = {
  label: 'Forward',
  init: () => console.log('Test'),
  disabled: true,
  preserveIconSpace: true,
};

const actionProps = {
  label: 'Reload',
  init: () => console.log('Test'),
  preserveIconSpace: true,
};
</script>
<template>
<ClientOnly>
  <ContextMenu theme="light">
    <ContextOption
      :props="backProps"
    />
    <ContextOption
      :props="forwardProps"
    />
    <ContextOption
      :props="actionProps"
    />
  </ContextMenu>
</ClientOnly>
</template>
```
### Caveats

- #### ContextOption Icon

When passing an icon to the `ContextOption` component,make sure that they are 1rem both in width and height.

```ts
<ContextOption :props="{ label: 'Rotate 270deg' }">
    <template #Icon>
        <div style="width: 1rem; height: 1rem">
            <img
              src="https://via.placeholder.com/25"
              alt="icon"
              width="100%"
              height="100%"
            />
        </div>
    </template>
</ContextOption>
```

- ### Change Animation

If you want to change the animation, here is the default animation you can override it.

```css
/* default */
.vue3-next-context-hover-menus .hover-menu {
  /* initial state */
  opacity: 0;
  transition: opacity ease 0.3s;
}

.vue3-next-context-hover-menus .hover-menu[data-show] {
  /* final state */
  opacity: 1;
}
```

```css
/* overridden */
.vue3-next-context-hover-menus .hover-menu {
  opacity: 0 !important;
  transition: opacity ease 2s !important;
}

.vue3-next-context-hover-menus .hover-menu[data-show] {
  opacity: 1 !important;
}
```
- ### Overflow

#### In this example `overflowProtection` is false so that you can go as deep as you want.

```ts
<template>
  <ContextMenu>
    <ContextOption :props="RotateProps">
      <ContextOption :props="{ label: 'Rotate 90deg' }" >
        <ContextOption :props="{ label: 'Rotate 180deg' }" >
            <ContextOption :props="{ label: 'Rotate 270deg' }" />
        </ContextOption>
      </ContextOption>
    </ContextOption>
  </ContextMenu>
</template>

<script setup lang="ts">
import { ContextOption, ContextMenu } from "vue3-next-context-menu/components";
import MuteSvg from "@/icons/Mute.svg?raw";
import "vue3-next-context-menu/styles.css"

const RotateProps = {
  label: "Rotate",
  disabled: false,
  icon: MuteSvg,
};
</script>
```
