//TODO make sure does not execute on server side rendering
export const remToPx = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
