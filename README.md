# Optional
This library is made to avoid as much as possible the usage of `null` or `undefined` values. It is mostly inspired by the Optional interface of Java language.

## Installation
This library is available on the [NPM registry](https://www.npmjs.com/package/optional)
```bash
# Using npm
$ npm i optional

# Using yarn
$ yarn add optional
```
## Usage
### Creation
You have three ways to create an Optional value :

#### of

```typescript
import { Optional, of } from "optional"

...

const foo: Optional<string> = of<string>("bar");
```
This way you have the value `"bar"` wrapped in an `Optional` object. If you pass the value `null` or `undefined` to the function `of`, it will throw a `NoElementError`.

#### ofNullable

```typescript
import { Optional, ofNullable } from "optional"

...

const foo: Optional<string> = ofNullable<string>(null);
const bar: Optional<string> = ofNullable<string>("bar");
```
In this case, the function won't throw any error but it will if you try to get the value inside of `foo`.

#### empty
```typescript
import { Optional, empty } from "optional"

...

const foo: Optional<string> = empty<string>();
```
Here, just like in the previous case, if you try to get the value inside of `foo` it will throw a `NoElementException`


### Getters
#### get
```typescript
import { Optional } from "optional"

...

const foo: Optional<string> = ... ;
const bar = foo.get();
```
The `get` method, as its name tell us, should be use to get the value wrapped in the `Optional` object. But use it only if you are absolutely sure there's a value inside, or at least use it inside a `try...catch` block as it follows.

```typescript
import { Optional, NoElementError } from "optional"

const foo: Optional<string> = ... ;

try {
  const bar = foo.get();
  ...
} catch(error: NoElementError) {
  ...
}
```
#### getOrDefault
The `getOrDefault` method is a way to pass a default value in case there's no value wrapped in the `Optional`.

```typescript
import { Optional } from "optional"

const foo: Optional<string> = ... ;

const bar = foo.getOrDefault("bar");
```
With this method, if there's no value in `foo` it will return `"bar"`.

#### getOrElse
The `getOrElse` method follow the same principles than `getOrDefault` except it takes a function as an argument.

```typescript
import { Optional } from "optional"

function getRandomString(): string {
    // Do what you want here but return a string
}

const foo: Optional<string> = ... ;

const bar = foo.getOrElse(getRandomString);
```
Here, if `foo` is empty, `getRandomString` will be called and it's result will be returned.

#### getOrThrow
This method is use to control the Error to throw in case there's no value in an `Optional` object.

Instead of 
```typescript
import { Optional, NoElementError } from "optional";

try {
    const foo: Optional<string> = ...;
    const bar: string = foo.get();
} catch(error: NoElementError) {
    throw new MyCustomError();
}
```
You can do 
```typescript
import { Optional } from "optional";


const foo: Optional<string> = ...;

const bar: string = foo.getOrThrow(MyCustomError);
// or
const bar: string = foo.getOrThrow(new MyCustomError("my custom error message"));
```

#### map
This method has the same purpose as the `Array.prototype.map` function. You can use it to transform the value contained in an `Optional` object.
But use it with caution, because it will throw a `NoElementError` if the object is empty.

```typescript
import { Optional, NoElementError } from "optional";

interface User {
    fistname: string;
    lastname: string;
    ...
}
...
const user: Optional<User> = getOneUser();
try {
    const username: string = user.map(u => `${u.firstname} ${u.lastname.toUpperCase()}`);
    ...
} catch(error: NoElementError) {

}
```