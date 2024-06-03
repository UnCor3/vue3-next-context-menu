export function checkLabelExists(label: string) {
  return document.querySelectorAll(`[data-label="${label}"]`);
}
