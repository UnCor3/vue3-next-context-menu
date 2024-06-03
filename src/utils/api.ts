import type { CtxRef } from "@/types";

export class ContextApiHandler {
  private state: CtxRef;
  constructor(state: any) {
    this.state = state;
  }

  close() {
    this.state.value!.isOpen = false;
  }
  open() {
    this.state.value!.isOpen = true;
  }
  openAt(x: number, y: number) {
    this.state.value!.x = x;
    this.state.value!.y = y;
    this.state.value!.isOpen = true;
  }
  toggle() {
    this.state.value!.isOpen = !this.state.value!.isOpen;
  }
  destroy() {
    // @ts-ignore as it's an internal property
    this.state.value!.__destroyed = true;
  }
  highlight: HighlightFunc = (label: string, at, forceOpen = true) => {
    //to make typescript happy
    if (!this.state.value) return;

    if (forceOpen) {
      this.state.value.isOpen = true;
    }

    if (typeof at === "object") {
      this.state.value.x = at.x;
      this.state.value.y = at.y;
    } else {
      if (at === "middle") {
        this.state.value.x = (window.innerWidth - 200) / 2;
        this.state.value.y = (window.innerHeight - 200) / 2;
      }
    }

    const elm = document.querySelector(`[data-label="${label}"]`);
    elm?.classList.add("highlight");
    setTimeout(() => {
      elm?.classList.remove("highlight");
    }, 1000);
  };
}

type HighlightFunc = (
  label: string,
  at:
    | "middle"
    | "last"
    | {
        x: number;
        y: number;
      },
  forceOpen?: boolean
) => void;
