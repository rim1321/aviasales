import { storeController, transaction } from '/store'


export default {
  init,
}

// зачем все это? ты действительно манипулировал хранилищем из консоли?
function init () {
  const isDev = process.env.NODE_ENV === 'development'
  if (!isDev) { return }

  window.transaction = transaction
  window.storeController = storeController

  window.model = {
    get state () {
      return storeController.getState()
    }
  }

  // что здесь происходит?
  Object.defineProperty(window, 'commit', {
    get () {
      const state = storeController.getState()
      const newState = JSON.parse(JSON.stringify(state))
      storeController.getStore().dispatch({ type: 'set-state', newState })
      return null
    },
  })
}
