type Mapper<T, R> = (value: T) => R;

interface Optional<T> {
  readonly isPresent: boolean;
  get: () => T;
  getOrElse: (defaultValue: T) => T;
  getOrThrow: <E extends Error>(error: E) => T;
  map: <R>(transformer: Mapper<T, R>) => R;
}

export class NoElementError extends Error {
  constructor() {
    super("Element not present");
  }
}

class Present<T> implements Optional<T> {
  constructor(private value: T) {}

  public readonly isPresent = true;

  public map<R>(transformer: Mapper<T, R>): R {
    return transformer(this.value);
  }

  public get(): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOrElse(_: T): T {
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getOrThrow<R extends Error>(_: R): T {
    return this.value;
  }
}

class Empty<T> implements Optional<T> {
  readonly isPresent: boolean = false;

  get(): T {
    throw new NoElementError();
  }

  getOrElse(defaultValue: T): T {
    return defaultValue;
  }

  getOrThrow<E extends Error>(error: E): T {
    throw error;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<R>(_: Mapper<T, R>): R {
    throw new NoElementError();
  }
}

export function of<T>(value: T): Optional<T> {
  if (value === null || value === undefined) {
    throw new Error("value is null");
  }
  return new Present(value);
}

export function ofNullable<T>(value: T): Optional<T> {
  if (value === null || value === undefined) {
    return new Empty<T>();
  }
  return new Present<T>(value);
}

export function empty<T>(): Optional<T> {
  return new Empty<T>();
}
