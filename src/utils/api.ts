import type { CtxRef } from "@/types";
import { watch } from "vue";

type Events = "close" | "open" | "openAt" | "toggle" | "destroy" | "highlight";

export class ContextApiHandler {
  private state: CtxRef;
  constructor(state: any) {
    this.state = state;

    watch(
      () => this.state.value?.isOpen,
      (isOpen) => {
        if (isOpen) {
          this.events["open"]?.();
        } else {
          this.events["close"]?.();
        }
      }
    );
  }

  events: Record<string, Function> = {};

  on = (event: Events, cb: Function) => {
    this.events[event] = cb;
  };

  close() {
    this.state.value!.isOpen = false;
    this.events["close"]?.();
  }
  open() {
    this.state.value!.isOpen = true;
    this.events["open"]?.();
  }
  openAt(x: number, y: number) {
    this.state.value!.x = x;
    this.state.value!.y = y;
    this.state.value!.isOpen = true;
    this.events["openAt"]?.();
  }
  toggle() {
    this.state.value!.isOpen = !this.state.value!.isOpen;
    this.events["toggle"]?.();
  }
  destroy() {
    // @ts-ignore as it's an internal property
    this.state.value!.__destroyed = true;
    this.events["destroy"]?.();
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
    const elm = document.querySelector(
      `.vue3-context-menu[data-instance-id="${this.state.value.instanceId}"] [data-label="${label}"]`
    );
    elm?.classList.add("highlight");
    setTimeout(() => {
      elm?.classList.remove("highlight");
      this.events["highlight"]?.();
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
