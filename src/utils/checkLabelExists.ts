import { useContextMenu } from "@/store";

export function checkLabelExists(label: string) {
  const { state } = useContextMenu();
  if (state.value.actions.find((action) => action.label === label)) {
    console.log(state.value.actions);
    throw new Error(`Label already exists, make sure to use unique labels, 
    Already existing label was : "${label}"`);
  }
}
