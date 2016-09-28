export default () => {
  let callbacks
  const p = new Promise((resolve, reject) => {
    callbacks = { resolve, reject }
  })
  p.resolve = callbacks.resolve
  p.reject = callbacks.reject
  return p
}
