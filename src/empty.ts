import { Optionable, NoElementError } from ".";
import type { Factory, Func, Mapper, Predicate } from ".";
import { empty, ofNullable } from "./factories";

export default class Empty<T> implements Optionable<T> {
  public readonly isPresent: boolean = false;
  public readonly isEmpty: boolean = true;

  public get(): T {
    throw new NoElementError();
  }

  private isFunction(f: T | Factory<T>): f is Factory<T> {
    return typeof f === "function";
  }

  public orElse(supplier: T | Factory<T>): T {
    if (this.isFunction(supplier)) {
      return supplier();
    }
    return supplier;
  }

  public orThrow<E extends ErrorConstructor | Error>(error?: E): T {
    if (!error) {
      throw new NoElementError();
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new (error as ErrorConstructor)();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public map<R>(_: Mapper<T, R>): Optionable<R> {
    return empty<R>();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public filter(_: Predicate<T>): Optionable<T> {
    return empty<T>();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public flatMap<R>(_: Mapper<T, Optionable<R>>): Optionable<R> {
    return empty<R>();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ifPresent(_: Func<T>): void {
    // do nothing
  }

  public ifPresentOrElse(_: (t: T) => void, runnable: () => void): void {
    runnable();
  }

  public or(factory: Factory<T>): Optionable<T> {
    return ofNullable(factory());
  }

  public toString(): string {
    return "Empty()";
  }
}
