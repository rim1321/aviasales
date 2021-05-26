import React from 'react'
import PropTypes from 'prop-types'
import ui from '/ui'

import './app.css'


function App ({
  filters,
  tabs,
  serp,
}) {

  // здесь и везде
  // не очень хорошо читается когда ты разбиваешь рендер на подфунции
  // лучше разбивать на компоненты

  return (
    <div className='app'>
      { _renderHeader() }
      { _renderFilters() }
      { _renderBody() }
    </div>
  )


  function _renderHeader () {
    return (
      <div className='app__header'>
        <ui.Logo />
      </div>
    )
  }


  function _renderBody () {
    return (
      <div className='app__body'>
        { _renderTabs() }
        { _renderSerp() }
      </div>
    )
  }


  function _renderFilters () {
    if (!filters) { return null }
    return (
      <div className="app__filters">
        { filters }
      </div>
    )
  }


  function _renderTabs () {
    if (!tabs) { return null }
    return (
      <div className="app__sorting-tab">
        { tabs }
      </div>
    )
  }


  function _renderSerp () {
    if (!serp) { return null }
    return (
      <div className="app__serp">
        { serp }
      </div>
    )
  }
}


App.propTypes = {
  filters: PropTypes.element.isRequired,
  tabs: PropTypes.element.isRequired,
  serp: PropTypes.element.isRequired,
}


export default App
