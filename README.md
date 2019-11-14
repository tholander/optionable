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

