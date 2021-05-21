import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../commons/root-reducer'


export default {
  init,
  getStore,
  getState,
}


let store


function init () {
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware())
  )

  return store
}


function getStore () {
  return store
}


function getState () {
  return store.getState()
}
