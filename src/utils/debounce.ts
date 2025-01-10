export function debounce<F extends (...params: unknown[]) => void>(
  fn: F,
  delay: number,
) {
  let timeoutID: number = 0;
  return function func(this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
  } as F;
}
