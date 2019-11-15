type Mapper<T, R> = (value: T) => R;
type Factory<T> = () => T;

interface Optionable<T> {
  readonly isPresent: boolean;
  get: () => T;
  getOrElse: (factory: Factory<T>) => T;
  getOrDefault: (defaultValue: T) => T;
  getOrThrow: <E extends ErrorConstructor>(error: E) => T;
  map: <R>(transformer: Mapper<T, R>) => R;
}

export class NoElementError extends Error {
  constructor() {
    super("Element not present");
  }
}

class Present<T> implements Optionable<T> {
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
  public getOrThrow<E extends ErrorConstructor>(_: E): T {
    return this.value;
  }
}

class Empty<T> implements Optionable<T> {
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
  public map<R>(_: Mapper<T, R>): R {
    throw new NoElementError();
  }
}

export function of<T>(value: T): Optionable<T> {
  if (value === null || value === undefined) {
    throw new Error("value is null");
  }
  return new Present(value);
}

export function ofNullable<T>(value: T): Optionable<T> {
  if (value === null || value === undefined) {
    return new Empty<T>();
  }
  return new Present<T>(value);
}

export function empty<T>(): Optionable<T> {
  return new Empty<T>();
}
