import { Optionable } from ".";
import { Present } from "./present";
import Empty from "./empty";

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
