module.exports = () => {
  let callbacks
  let done = false

  const p = new Promise((resolve, reject) => {
    callbacks = { resolve, reject }
  })

  p.done = () => done
  p.resolve = (val) => {
    callbacks.resolve(val)
    done = true
    return p
  }
  p.reject = (val) => {
    callbacks.reject(val)
    done = true
    return p
  }

  return p
}
