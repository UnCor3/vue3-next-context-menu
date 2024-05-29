import { useContextMenu } from "@/store";

const { state } = useContextMenu();

//REFACTOR
class ContextApiHandler {
  state: any;
  constructor(state: any) {
    this.state = state;
  }

  close() {
    state.value.isOpen = false;
  }
  open() {
    state.value.isOpen = true;
  }
  openAt(x: number, y: number) {
    state.value.x = x;
    state.value.y = y;
    state.value.isOpen = true;
  }
  toggle() {
    state.value.isOpen = !state.value.isOpen;
  }
  //todo
  //is this the right way to do it?
  destroy() {
    state.value.actions = [];
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
    console.log(elm);
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

let api: ContextApiHandler;

export const handleContextApi = (ref: any) => {
  if (!api) {
    api = new ContextApiHandler(ref);
  }
  return api;
};
