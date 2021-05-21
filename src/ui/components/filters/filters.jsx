import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './filters.css'


function Filters ({
  filters,
  onFilterClick,
}) {
  const filterList = [
    {
      id: 'all',
      label: "Все",
      checked: filters.all,
    },
    {
      id: '0-stop',
      label: "Без пересадок",
      checked: filters['0-stop'],
    },
    {
      id: '1-stop',
      label: "1 пересадка",
      checked: filters['1-stop'],
    },
    {
      id: '2-stop',
      label: "2 пересадки",
      checked: filters['2-stop'],
    },
    {
      id: '3-stop',
      label: "3 пересадки",
      checked: filters['3-stop'],
    },
  ]

  return (
    <div className="filters">
      <h3 className="filters__header">Количество пересадок</h3>
      {filterList.map(f => (
        <label
          key={f.id}
          data-id={ f.id }
          className={classNames({
            'filters__checkbox': true,
            'filters__checkbox_checked': f.checked
          })}
          onClick={(evt) => {
            evt.preventDefault()
            onFilterClick(f.id)
          }}
        >
          <input
            className="filters__checkbox-input"
            type="checkbox"
          />
          <span className="filters__checkbox-beautiful-input" />
          <span className="filters__checkbox-text">
            {f.label}
          </span>
        </label>
      ))}
    </div>
  )
}


Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterClick: PropTypes.func.isRequired,
}


export default Filters
