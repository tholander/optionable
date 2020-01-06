import { Optionable, NoElementError, Factory, Mapper, Predicate, Func } from ".";
import { empty } from "./factories";

export default class Empty<T> implements Optionable<T> {
  public readonly isPresent: boolean = false;

  public get(): T {
    throw new NoElementError();
  }

  public getOrDefault(defaultValue: T): T {
    return defaultValue;
  }

  public getOrElse(factory: Factory<T>): T {
    return factory();
  }

  public getOrThrow<E extends ErrorConstructor>(error: E): T {
    throw new error();
  }

  public getOrThrowError<E extends Error>(error: E): T {
    throw error;
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
}
