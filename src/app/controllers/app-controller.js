import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { devController } from '/dev'
import { storeController } from '/store'
import AppMediator from '../components/app-mediator'
import urlController from './app-url-controller'
import outlineController from './app-outline-controller'


export default {
  init,
}


function init () {
  storeController.init()
  devController.init()
  urlController.init()
  outlineController.init()
  initReact()
}


function initReact () {
  const store = storeController.getStore()
  ReactDOM.render((
    <Provider store={store}>
      <Router>
        <Switch>
          <AppMediator/>
        </Switch>
      </Router>
    </Provider>
  ), document.getElementById('root'))
}
