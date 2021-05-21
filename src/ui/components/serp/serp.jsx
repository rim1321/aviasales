import React from 'react'
import PropTypes from 'prop-types'
import './serp.css'


function Serp ({
  tickets,
  totalTicketCount,
  onShowMoreClick,
}) {
  return (
    <div className='serp'>
      { _renderTicketList() }
      { _renderSerpMessage() }
    </div>
  )


  function _renderTicketList () {
    if (tickets.length === 0) { return null }
    return (
      <React.Fragment>
        {tickets.map(t => {
          return (
            <div className="serp__ticket" key={t.id}>
              {t.element}
            </div>
          )
        })}
        <button
          className="serp__show-more-btn"
          onClick={() => onShowMoreClick()}
        >
          Показать еще 5 билетов!
        </button>
      </React.Fragment>
    )
  }


  function _renderSerpMessage () {
    if (tickets.length > 0) {
      return null
    }

    let message
    if (totalTicketCount === 0) {
      message = 'Загрузка билетов'
    }
    else {
      message = `Найдено ${totalTicketCount} рейсов, но ни один не соответствует заданным фильтрам`
    }

    return (
      <div className='serp__message'>
        {message}
      </div>
    )
  }
}


Serp.propTypes = {
  tickets: PropTypes.array.isRequired,
  totalTicketCount: PropTypes.number.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
}


export default Serp
