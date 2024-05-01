import { useContextMenu } from "@/store";

export const handleContextMenu = (ctxMenuElm: HTMLElement) => {
  const { state } = useContextMenu();

  return (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { height } = ctxMenuElm.getBoundingClientRect();
    const offsetWidth = ctxMenuElm.offsetWidth;

    const paddingY = 25;
    const paddingX = 25;

    // check if the context menu will go out of the screen
    const y =
      e.clientY + height > window.innerHeight
        ? window.innerHeight - height - paddingY
        : e.clientY;
    const x =
      e.clientX + offsetWidth > window.innerWidth
        ? window.innerWidth - offsetWidth - paddingX
        : e.clientX;

    state.value = {
      ...state.value,
      isOpen: true,
      x,
      y,
    };
  };
};
