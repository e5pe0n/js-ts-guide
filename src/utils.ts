/**
 * Equivalent to *Omit* but suggest keys of `T` when coding.
 *
 * @example
 * ```
 * type User = { id: string; name: string; age: number; };
 * type UserWithName = Except<User, "id" | "age">;  // { name: string; }
 * ```
 */
export type Except<T, U extends keyof T> = {
  [Prop in keyof T as Exclude<Prop, U>]: T[Prop];
};

/**
 * Override the property types of `T` by given `U`.
 *
 * @example
 * ```
 * type User = { id: string; name: string; age: number; }
 * type AnotherUser = Override<User, { id: number; age: number? }>
 * // { id: number; name: string; age?: number | undefined }
 * ```
 */
export type Override<T, U extends { [Prop in keyof T]?: any }> = {
  [Prop in keyof T as Exclude<Prop, keyof U>]: T[Prop];
} & {
  [Prop in keyof U]: U[Prop];
};

/**
 * Crate a new Array such as [0, 1, ..., `stop - 1`].
 *
 * @example
 * ```
 * range(5);  // [0, 1, 2, 3, 4]
 * ```
 */
export function range(stop: number): number[];
/**
 * Create a new Array contains from `start` to `stop`(exclusive) by `step` in order.
 *
 * @example
 * ```
 * range(0, 5, 2);  // [0, 2, 4]
 * range(5, 0, -2); // [5, 3, 1]
 * ```
 */
export function range(start: number, stop: number, step: number): number[];
export function range(start: number, stop?: number, step?: number): number[] {
  // in case overload1, start = stop (the first arg), stop = undefined, step = undefined
  const _start = stop ? start : 0;
  const _stop = stop ?? start;
  const _step = step ?? 1;

  if (_step === 0) {
    throw new RangeError(
      `invalid argument: step must not be 0. step=${_step} given.`
    );
  }

  const len = Math.ceil((_stop - _start) / _step);
  return len <= 0
    ? []
    : Array.from(new Array(len), (_, i) => _start + i * _step);
}

/**
 * Return a new function which returns `defaultValue` if the argument to `fn` is `undefined` or `null`.
 *
 * @example
 * ```
 * const fmtDate = (date: Date): string => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
 * const safeFmtDate: (date?: Date | null) => string = safetifyFn(fmtDate, "");
 *
 * safeFmtDate(new Date(2022, 1 - 1, 1));  // 2022-1-1
 * safeFmtDate(undefined);  // ""
 * safeFmtDate(null);  // ""
 * ```
 */
const safetifyFn =
  <T, U>(fn: (x: T) => U, defaultValue: U) =>
  (x?: T | null) =>
    x !== undefined && x !== null ? fn(x) : defaultValue;
