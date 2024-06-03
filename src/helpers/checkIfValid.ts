import { logError } from "@/helpers";
import { Action } from "@/types";
import { inject } from "vue";

export function checkIfValid(props: Action) {
  const isCtxMenu = inject("isCtxMenu", false);
  const usedLabels = inject("usedLabels") as string[];

  if (!isCtxMenu) {
    logError("Any component must be a child of ContextMenu");
  }

  if (!props) {
    logError("You need to provide props");
  }

  if (usedLabels.includes(props.label))
    logError(
      `Label ${props.label} already exists, you will have problems using some features please use a unique label.`
    );

  usedLabels.push(props.label);
}
