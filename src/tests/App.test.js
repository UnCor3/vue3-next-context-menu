import { mount } from "@vue/test-utils";
import {
  test,
  expect,
  exists,
  toBe,
  toBeTruthy,
  beforeEach,
  afterEach,
  it,
  toBeFalsy,
} from "vitest";

import App from "./App.vue";
import { useContextMenu } from "../store.ts";

beforeEach(() => {
  // create teleport target
  const el = document.createElement("div");
  el.className = "vue3-next-context-hover-menus";
  document.body.appendChild(el);
});

afterEach(() => {
  // clean up
  document.body.innerHTML = "";
});

it("should render the app", () => {
  expect(App).toBeTruthy();
  const wrapper = mount(App);
  expect(wrapper.exists()).toBe(true);
});

// TODO: fix this tests
// useContextMenu needs to be called in onMounted hook
// and it's not possible to call it in test

// it("should give access to api", () => {
//   const { state } = useContextMenu();
//   expect(state.value).toBeTruthy();
// });

// it("should toggle menu", () => {
//   expect(App).toBeTruthy();
//   const wrapper = mount(App);
//   expect(wrapper.exists()).toBe(true);

//   const { state, api } = useContextMenu();
//   expect(state.value.isOpen).toBeFalsy();
//   api.open();
//   expect(state.value.isOpen).toBeTruthy();
// });
