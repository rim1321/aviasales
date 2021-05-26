import safeModify from './safe-modify'
import storeController from '../controllers/store-controller'

// плохо что любой акшн называется set-state. 
// лучше называть то что они делают - setFilter, setTab etc..
// сейчас в девтулсе в браузере сложно ориентироваться. Если проект будет большой - будет только хуже
// масштабировать такой проект сложнее
// лучше описать много маленьких редьюсеров - тогда будет лучшая читаемость и понимание проекта в целом
// если считаешь что это бойлерплейт, то есть инструменты, например: @reduxjs/toolkit (который ты указал в package.json и не используешь :-) )

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
