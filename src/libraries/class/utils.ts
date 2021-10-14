import { cancellablePromise } from "./cancelable-promise";

export const noop = () => {};

export const delay = n => new Promise(resolve => setTimeout(resolve, n));

export { cancellablePromise };