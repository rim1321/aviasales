import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ui from '/ui'
import { transaction } from '/store'


function FiltersMediator ({
  filters,
}) {
  return (
    <ui.Filters
      filters={ filters }
      onFilterClick={ _onFilterClick }
    />
  )
}


function _onFilterClick (id) {
  transaction(s => {
    // масло масленное, не читается, хорошо бы отрефакторить
    const filters = s.filters

    if (id === 'all') {
      const newValue = !filters['all']
      for (const key in filters) { filters[key] = newValue }
      return
    }
    filters[id] = !filters[id]

    let resultAll = true
    for (const key in filters) {
      if (key === 'all') { continue }
      resultAll = resultAll && filters[key]
    }

    filters['all'] = resultAll
  })
}


const mapStateToProps = state => ({
  filters: state.filters,
})


FiltersMediator.propTypes = {
  filters: PropTypes.object.isRequired, // не хватает типов
}


export default connect(mapStateToProps, null)(FiltersMediator)
