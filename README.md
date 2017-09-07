# empty-promise

[![Build Status](https://travis-ci.org/blockai/empty-promise.svg?branch=master)](https://travis-ci.org/blockai/empty-promise)

Constructs an empty promise (pun intended) that can be resolved or
rejected from the outside.

Instead of wrapping your promise in around your logic code, you may pass an empty promise through your code and resolve it later.

---
Can be quite useful for writing easier to read asynchronous tests. Also solves difficult problems in complex scenarios involving multiple paradigms of streams, events, callbacks, etc.

This style of coding shows potential for significantly simplifying promise based designs, but also shows potential to turn your code into a confusing mess. Approach it cautiously until we can hash out a few best practices.

Not to be confused with `Promise.resolve()` and `Promise.reject()` from the native Promise API. These native methods only create a fully resolved or fully rejected promise on the fly. (The simplest possible empty promise usage in the first example is functionally equivalent to using `Promise.resolve()`.)

## Install

```bash
npm install --save empty-promise
```

Requires Node v6+

## Basic Usage


_The bare minimum:_ Here we create an empty promise, then resolve it with "hello promise" and pass the results to `console.log()`.

```javascript
import emptyPromise from 'empty-promise'

emptyPromise()
  .resolve('hello promise')
  .then(console.log) // logs 'hello promise'
```
```javascript
// Alternatively you may use Nodejs style require
const emptyPromise = require('empty-promise')
```


_It's asynchronous:_ Just like any other promise, you can pass it around and add `then()` or `catch()` calls before it resolves.

```javascript
const wait = emptyPromise()

wait
  .then((val) => {
    console.log(`val`) // 'some value'
  })
  .catch((err) => {
    console.err(err) // does not call because we did not reject
  })

setTimeout(() => {
  wait.resolve('some value')
}, 1000)
```


_Works with ES6 async/await:_ Here we repeat the previous example inside an async IIFE.

```javascript
const wait = emptyPromise()

(async ()=> {
  let value

  try { value = await wait }
  catch (err) {
    console.error(err)
  }

  console.log('${value}') // 'some value'
})()

setTimeout(() => {
  wait.resolve('some value')
}, 1000)
```
_Only resolves once:_ Important to reiterate that an empty promise is basically still just a promise. Like any other promise, once it resolves, it will not resolve again.

```javascript
const promise = emptyPromise()

[42, 2, 17].forEach(async number => {
  console.log(number)  // 42, 2, 17
  const resolvedNumber = await promise.resolve(number)
  console.log(resolvedNumber) // 42, 42, 42
})
```

_New feature- done status:_ Now we can call `done()` method on an empty promise to find out it's resolved status. Returns `true` if resolved or rejected, and `false` if still pending. This can be used for optimizing or cancelling expensive actions that might wastefully attempt to resolve the promise a second time.

```javascript
const promise = emptyPromise()

[42, 2, 17].map(number => {

  if (promise.done())
    return promise

  return promise.resolve(number)

}).forEach(console.log) // 42, 42, 42

```

See [Empty Promise Playground](http://github.com/skylize/empty-promise-playground) for more usage.
