import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ui from '/ui'
import { transaction } from '/store'


function SortingTabsMediator ({
  selectedTabId,
}) {
  return (
    <ui.SortingTabs
      selectedTabId={ selectedTabId }
      onTabClick={ (id) => transaction(s => s.selectedTabId = id)}
    />
  )
}


SortingTabsMediator.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
}


const mapStateToProps = (state) => ({
  selectedTabId: state.selectedTabId,
})


export default connect(mapStateToProps, null)(SortingTabsMediator)
