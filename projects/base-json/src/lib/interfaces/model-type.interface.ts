/**
 * Represents an object of the defined type T that can be instantiated.
 */
export type ModelType<T> = new(...args: any[]) => T;
