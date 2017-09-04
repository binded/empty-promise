import test from 'blue-tape'
import emptyPromise from '../src'

test('resolve', (t) => {
  const wait = emptyPromise()

  wait.then((val) => {
    t.equal(val, 'some value')
    t.end()
  })

  process.nextTick(() => {
    wait.resolve('some value')
  })
})

test('reject', (t) => {
  const wait = emptyPromise()

  wait.catch((err) => {
    t.equal(err.message, 'some error')
    t.end()
  })

  process.nextTick(() => {
    wait.reject(new Error('some error'))
  })
})

test('resolve returns original promise', (t) => {
  const wait = emptyPromise()

  const result = wait.resolve('some value')

  t.equal(result instanceof Promise, true)
  t.equal(result, wait)

  t.end()
})

test('reject returns original promise', (t) => {
  const wait = emptyPromise()

  const result = wait.reject('some error')

  t.equal(result instanceof Promise, true)
  t.equal(result, wait)

  result.catch(() => { /* ignore */ })
  t.end()
})

test('receive resolved value after awaiting resolve', (t) => {
  (async () => {
    const wait = emptyPromise()
    const result = await wait.resolve('some value')

    t.equal(result, 'some value')
    t.end()
  })()
})

test('done returns false if promise not resolved', (t) => {
  const wait = emptyPromise()
  t.equal(wait.done(), false)
  wait.resolve().then(() => t.end())
})

test('done returns true after promise resolved', (t) => {
  (async () => {
    const wait = emptyPromise()
    await wait.resolve('some value')

    t.equal(wait.done(), true)
    t.end()
  })()
})

test('done returns true after promise rejected', (t) => {
  (async () => {
    const wait = emptyPromise()
    await wait.reject('some error')
      .catch(() => { /* ignore */ })

    t.equal(wait.done(), true)
    t.end()
  })()
})
