import { Optionable } from ".";
import type { Factory, Func, Mapper, Predicate } from ".";
import { ofNullable, of, empty } from "./factories";

export class Present<T> implements Optionable<T> {
  constructor(private value: T) {}

  public readonly isPresent = true;
  public readonly isEmpty = false;

  public get(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public orElse(_: T | Factory<T>): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public orThrow<E extends ErrorConstructor | Error>(_?: E): T {
    return this.value;
  }

  public map<R>(transformer: Mapper<T, R>): Optionable<R> {
    return ofNullable(transformer(this.value));
  }

  public filter(predicate: Predicate<T>): Optionable<T> {
    return predicate(this.value) ? of(this.value) : empty<T>();
  }

  public flatMap<R>(mapper: Mapper<T, Optionable<R>>): Optionable<R> {
    return mapper(this.value);
  }

  public ifPresent(func: Func<T>): void {
    return func(this.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ifPresentOrElse(consumer: (t: T) => void, _: () => void): void {
    consumer(this.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public or(_: Factory<T>): Optionable<T> {
    return this;
  }

  public toString(): string {
    return `Optional(${this.value})`;
  }
}
