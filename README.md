# Optionable

[![npm](https://img.shields.io/npm/v/optionable)](https://www.npmjs.com/package/optionable)
[![CircleCI Build](https://img.shields.io/circleci/build/github/tholander/optionable)](https://circleci.com/gh/tholander/optionable)
[![Coverage Status](https://coveralls.io/repos/github/tholander/optionable/badge.svg)](https://coveralls.io/github/tholander/optionable)


This library is made to avoid as much as possible the usage of `null` or `undefined` values. It is mostly inspired by the Optional interface of Java language.

## Installation
This library is available on the [NPM registry](https://www.npmjs.com/package/optionable)
```bash
# Using npm
$ npm i optionable

# Using yarn
$ yarn add optionable
```
## Usage
### Creation
You have three ways to create an Optionable value :

#### of

```typescript
import { Optionable, of } from "optionable"

...

const foo: Optionable<string> = of<string>("bar");
```
This way you have the value `"bar"` wrapped in an `Optionable` object. If you pass the value `null` or `undefined` to the function `of`, it will throw a `NoElementError`.

#### ofNullable

```typescript
import { Optionable, ofNullable } from "optionable"

...

const foo: Optionable<string> = ofNullable<string>(null);
const bar: Optionable<string> = ofNullable<string>("bar");
```
In this case, the function won't throw any error but it will if you try to get the value inside of `foo`.

#### empty
```typescript
import { Optionable, empty } from "optionable"

...

const foo: Optionable<string> = empty<string>();
```
Here, just like in the previous case, if you try to get the value inside of `foo` it will throw a `NoElementException`


### Getters
#### get
```typescript
import { Optionable } from "optionable"

...

const foo: Optionable<string> = ... ;
const bar = foo.get();
```
The `get` method, as its name tell us, should be use to get the value wrapped in the `Optionable` object. But use it only if you are absolutely sure there's a value inside, or at least use it inside a `try...catch` block as it follows.

```typescript
import { Optionable, NoElementError } from "optionable"

const foo: Optionable<string> = ... ;

try {
  const bar = foo.get();
  ...
} catch(error: NoElementError) {
  ...
}
```
#### orElse
The `orElse` method is a way to pass a default value in case there's no value wrapped in the `Optionable`.

```typescript
import { Optionable } from "optionable"

const foo: Optionable<string> = ... ;

const bar = foo.orElse("bar");
```
With this method, if there's no value in `foo` it will return `"bar"`.

The `orElse` method also accept a factory callback as an argument. The callback will be executed if no value is present in the `Optionable`

```typescript
import { Optionable } from "optionable"

function getRandomString(): string {
    // Do what you want here but return a string
}

const foo: Optionable<string> = ... ;

const bar = foo.orElse(getRandomString);
```
Here, if `foo` is empty, `getRandomString` will be called and it's result will be returned.

#### orThrow
This method is use to control the Error to throw in case there's no value in an `Optionable` object.

Instead of 
```typescript
import { Optionable, NoElementError } from "optionable";

try {
    const foo: Optionable<string> = ...;
    const bar: string = foo.get();
} catch(error: NoElementError) {
    throw new MyCustomError();
}
```
You can do 
```typescript
import { Optionable } from "optionable";


const foo: Optionable<string> = ...;

const bar: string = foo.orThrow(); // will throw a NoElementError
// or
const bar: string = foo.orThrow(MyCustomError);
// or
const bar: string = foo.orThrow(new MyCustomError("my custom error message"));
```

### Helpers
#### map
This method has the same purpose as the `Array.prototype.map` function. You can use it to transform the value contained in an `Optionable` object.

```typescript
import { Optionable, NoElementError } from "optionable";

interface User {
    fistname: string;
    lastname: string;
    ...
}
...
const user: Optionable<User> = getOneUser();
const username: Optionable<string> = user.map(u => `${u.firstname} ${u.lastname.toUpperCase()}`);
```

#### filter
This method will return an empty `Optionable` if the predicate you pass to it is false
```typescript
import { of } from "optionable"

const foo = of("foo")
            .filter((str: string) => str.length < 2)
            .isPresent; // false
const bar = of("bar")
            .filter((str: string) => str.length > 0)
            .isPresent; // true
```

#### flatMap
This method is useful for mapping an `Optionable` object using a function which returns an `Optionable` value
```typescript
import { ofNullable, Optionable } from "optionable";

function getUsers(): Optionable<User[]> {
  ...
}

function getFirstWoman(users: User[]): Optionable<User> {
  return ofNullable(users.find(u => u.sex === "female"));
}

const users = getUsers();
const woman: Optionable<User> = users.flatMap(getFirstWoman);
```

### ifPresent
This method accept a callback which returns no result but accept the value as an argument. It will be executed only if a value is present in the `Optionable` object.

```typescript
import { of, empty } from "optionable";

function printLength(str: string) {
    console.log(str.length)
}

const foo = of<string>("foo").ifPresent(printLength); // prints 3
const bar = empty<string>().ifPresent(printLength); // prints nothing
```

### ifPresentOrElse
This method is almost the same as the previous one, except that it accepts a second argument. This argument is callback that will run if no value is present. The callback has no arguments and returns nothing.

```typescript
import { empty, of } from "optionable";

function printLength(str: string) {
    console.log(str.length);
}
function logError() {
    console.error("No value present");
}

const foo = of<string>("foo").ifPresentOrElse(printLength, logError); 
// prints 3

const bar = empty<string>().ifPresentOrElse(printLength, logError); 
// prints "No value present"
```

### or
This method is kind of a fallback method, to have a default value **inside** an `Optionable` object.

```typescript
import { Optionable } from "optionable";

function getSomeRandomString(): Optionable<string> {
    // do something to eventually return a string
}

const length: number = getSomeRandomString()
                        .or("")
                        .map(str => str.length)
                        .get();
```