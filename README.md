# empty-promise

[![Build Status](https://travis-ci.org/blockai/empty-promise.svg?branch=master)](https://travis-ci.org/blockai/empty-promise)

Constructs an empty promise (pun intended) that can be resolved or
rejected from the outside.

Can be useful for testing and in some complex scenarios that involve a
combination of streams, events, callbacks, etc. In general, should be
avoided.

## Install

```bash
npm install --save empty-promise
```

Requires Node v6+

## Usage

```javascript
import emptyPromise from 'empty-promise'

const wait = emptyPromise()

wait
  .then((val) => {
    console.log(`wait.resolve() was called with value ${val}`)
  })
  .catch((err) => {
    console.log(`wait.reject() was called with error ${err}`)
  })

setTimeout(() => {
  wait.resolve('some val')
}, 1000)
```

See [./test](./test) directory for more usage examples.