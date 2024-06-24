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
