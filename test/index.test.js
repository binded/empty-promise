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
