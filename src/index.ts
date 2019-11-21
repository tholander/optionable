export type Mapper<T, R> = (value: T) => R;
export type Factory<T> = () => T;

export interface Optionable<T> {
  readonly isPresent: boolean;
  get: () => T;
  getOrElse: (factory: Factory<T>) => T;
  getOrDefault: (defaultValue: T) => T;
  getOrThrow: <E extends ErrorConstructor | Error>(error: E) => T;
  map: <R>(transformer: Mapper<T, R>) => R;
}

export class NoElementError extends Error {
  constructor() {
    super("Element not present");
  }
}

export * from "./factories";
