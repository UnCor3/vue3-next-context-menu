export const remToPx = (rem: number) => {
  if (typeof window === "undefined") return 0;
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};
