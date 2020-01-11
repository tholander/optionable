export type Mapper<T, R> = (value: T) => R;
export type Factory<T> = () => T;
export type Predicate<T> = (value: T) => boolean;
export type Func<T> = (value: T) => void;
export type Runnable = () => void;

interface Thrower<T> {
  (): T;
  <E extends ErrorConstructor>(error: E): T;
  <E extends Error>(error: E): T;
}

interface Getter<T> {
  (defaultValue: T): T;
  (supplier: Factory<T>): T;
}

export interface Optionable<T> extends Object {
  readonly isPresent: boolean;
  readonly isEmpty: boolean;
  get(): T;
  orElse: Getter<T>;
  orThrow: Thrower<T>;
  map<R>(transformer: Mapper<T, R>): Optionable<R>;
  filter(predicate: Predicate<T>): Optionable<T>;
  flatMap: <R>(mapper: Mapper<T, Optionable<R>>) => Optionable<R>;
  ifPresent(func: Func<T>): void;
  ifPresentOrElse(consumer: Func<T>, runnable: Runnable): void;
  or(factory: Factory<T>): Optionable<T>;
}

export class NoElementError extends Error {
  constructor() {
    super("Element not present");
  }
}

export * from "./factories";
