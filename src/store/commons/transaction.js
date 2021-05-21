import safeModify from './safe-modify'
import storeController from '../controllers/store-controller'


function transaction (fn) {
  const store = storeController.getStore()
  const state = store.getState()
  const newState = safeModify(state, fn)
  store.dispatch({
    type: 'set-state',
    newState: newState,
  })
}


export default transaction
