import { Optionable, NoElementError, Factory, Mapper } from ".";
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

  public getOrThrow<E extends ErrorConstructor | Error>(error: E): T {
    if (error instanceof Error) {
      throw error;
    }
    throw new (error as ErrorConstructor)();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public map<R>(_: Mapper<T, R>): Optionable<R> {
    return empty<R>();
  }
}
