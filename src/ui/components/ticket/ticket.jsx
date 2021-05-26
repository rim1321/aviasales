import React from 'react'
import PropTypes from 'prop-types'
import './ticket.css'


function Ticket ({
  ticketInfo,
}) {
  return (
    <div className="ticket">
      <div className="ticket__head">
        <span className="ticket__price">
          {ticketInfo.price.toLocaleString('ru')} Р
        </span>
        <img
          className="ticket__logo-airline"
          src={`//pics.avs.io/99/36/${encodeURIComponent(ticketInfo.carrier)}.png`}
        />
      </div>
      <div className="ticket__info">
        {ticketInfo.segments.map((s, i) => (
          // индекс массива нельзя использовать для key. Почему?
          <div className="ticket__route" key={i}>
            <div className="ticket__route-info">
              <p className="ticket__route-label">{s.origin} – {s.destination}</p>
              <p className="ticket__route-value">{getSchedule(s.date, s.duration)}</p>
            </div>
            <div className="ticket__route-info">
              <p className="ticket__route-label">В пути</p>
              <p className="ticket__route-value">
                {getDurationValue(s.duration)}
              </p>
            </div>
            <div className="ticket__route-info">
              <p className="ticket__route-label">{getStopLabel(s.stops.length)}</p>
              <p className="ticket__route-value">{s.stops.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function getSchedule (date, duration) {
  const timeStart = Date.parse(date)
  // "duration" value in minutes. Convert to milliseconds
  const timeFinish = timeStart + duration * 60000
  return `${prettifyTime(timeStart)} – ${prettifyTime(timeFinish)}`
}


function prettifyTime (date) {
  const hours = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()

  const prettyHours = hours.toString().padStart(2, '0')
  const prettyMinutes = minutes.toString().padStart(2, '0')
  return `${prettyHours}:${prettyMinutes}`
}


function getStopLabel (number) {
  if (number === 0) {
    return 'без пересадок'
  }
  if (number === 1) {
    return '1 пересадка'
  }
  if (number > 1) {
    return `${number} пересадки`
  }
}


function getDurationValue (number) {
  const h = Math.floor(number / 60)
  const m = number % 60
  return `${h}ч ${m}м`
}


Ticket.propTypes = {
  ticketInfo: PropTypes.object.isRequired, // хорошо бы рассписать
}


export default Ticket
