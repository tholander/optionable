import { Optionable, Mapper, Factory, Predicate } from ".";
import { ofNullable, of, empty } from "./factories";

export class Present<T> implements Optionable<T> {
  constructor(private value: T) {}

  public readonly isPresent = true;

  public map<R>(transformer: Mapper<T, R>): Optionable<R> {
    return ofNullable(transformer(this.value));
  }

  public get(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOrDefault(_: T): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOrElse(_: Factory<T>): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOrThrow<E extends ErrorConstructor | Error>(_: E): T {
    return this.value;
  }

  public filter(predicate: Predicate<T>): Optionable<T> {
    return predicate(this.value) ? of(this.value) : empty<T>();
  }

  public flatMap<R>(mapper: Mapper<T, Optionable<R>>): Optionable<R> {
    return mapper(this.value);
  }
}
