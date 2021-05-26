export default safeModify

// в чем преимущество перед стандартным подходом? 
// Читается сложно, поддерживать еще сложнее, внедрять новых разработчиков долго, еще не факт что все это написано без ошибок


const _isProxy_ = Symbol('isProxy')
const _isProxifiedArray_ = Symbol('isProxifiedArray')
let running = false


function safeModify (state, fn) {
  const proxy = proxify(state)

  const prevRunning = running
  running = true
  fn(proxy)
  running = prevRunning

  return deproxify(proxy)
}


function proxify (any) {
  // array
  if (Array.isArray(any)) {
    const proxifiedArray = any.map(proxify)
    proxifiedArray[_isProxifiedArray_] = true
    return proxifiedArray
  }

  // not an object
  if (Object.prototype.toString.call(any) !== '[object Object]') {
    return any
  }

  // object
  const replica = { ...any }
  const proxifiedKeys = new Set()
  const proxy = new Proxy(replica, {
    get (target, key) {
      if (!(key in replica)) {
        return undefined
      }
      if (running && !proxifiedKeys.has(key)) {
        replica[key] = proxify(replica[key])
        proxifiedKeys.add(key)
      }
      return replica[key]
    },
    set (target, key, value) {
      replica[key] = value
      return true
    },
    deleteProperty (target, key) {
      delete replica[key]
      return true
    },
  })
  proxy[_isProxy_] = true
  return proxy
}


function deproxify (any) {
  // proxified array
  if (any && any[_isProxifiedArray_]) {
    delete any[_isProxifiedArray_]
    return any.map(deproxify)
  }

  // regular array? => find proxified items and deproify them
  if (Array.isArray(any)) {
    any.forEach((item, i) => {
      if (item && item[_isProxy_]) {
        any[i] = deproxify(item)
      }
    })
  }

  // not a proxy
  if (!any || !any[_isProxy_]) {
    return any
  }

  // proxy
  const object = {}
  for (const key in any) {
    object[key] = deproxify(any[key])
  }
  return object
}
