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
