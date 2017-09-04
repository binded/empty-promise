module.exports = () => {
  let callbacks
  const p = new Promise((resolve, reject) => {
    callbacks = { resolve, reject }
  })
  p.resolve = (val) => {
    callbacks.resolve(val)
    return p
  }
  p.reject = (val) => {
    callbacks.reject(val)
    return p
  }
  return p
}
