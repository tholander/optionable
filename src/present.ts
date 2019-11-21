import { Optionable, Mapper, Factory } from ".";

export class Present<T> implements Optionable<T> {
  constructor(private value: T) {}

  public readonly isPresent = true;

  public map<R>(transformer: Mapper<T, R>): R {
    return transformer(this.value);
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
}
