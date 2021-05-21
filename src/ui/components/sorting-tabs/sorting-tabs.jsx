import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './sorting-tabs.css'


function SortingTabs ({
  selectedTabId,
  onTabClick,
}) {
  const tabs = [
    {
      id: 'cheap',
      label: 'Самый дешевый',
    },
    {
      id: 'quick',
      label: 'Самый быстрый',
    },
    {
      id: 'optimal',
      label: 'Оптимальный',
    },
  ]

  return (
    <div className="sort-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={classNames({
            'sort-tabs__btn': true,
            'sort-tabs__btn_active': tab.id === selectedTabId,
          })}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}


SortingTabs.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
}


export default SortingTabs
