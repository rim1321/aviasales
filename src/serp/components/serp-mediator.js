import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ui from '/ui'


function SerpMediator ({
  tickets,
  filters,
  selectedTabId,
}) {
  const [pageSize, setPageSize] = useState(5)

  let preparedTickets
  preparedTickets = [...tickets]
  preparedTickets = filterTickets(preparedTickets, filters)
  preparedTickets = sortTickets(preparedTickets, selectedTabId)
  preparedTickets = preparedTickets.slice(0, pageSize)

  const ticketList = preparedTickets.map(t => ({
    id: t.id,
    element: <ui.Ticket ticketInfo={t} />
  }))

  return (
    <ui.Serp
      tickets={ ticketList }
      onShowMoreClick={ () => setPageSize(pageSize + 5) }
      totalTicketCount={ tickets.length }
    />
  )
}


function filterTickets (tickets, filters) {
  if (filters['all']) {
    return tickets
  }

  return tickets.filter(ticket => {
    const ticketStops = Math.max(
      ticket.segments[0].stops.length,
      ticket.segments[1].stops.length
    )

    return (
      ticketStops === 0 && filters['0-stop'] ||
      ticketStops === 1 && filters['1-stop'] ||
      ticketStops === 2 && filters['2-stop'] ||
      ticketStops === 3 && filters['3-stop']
    )
  })
}


function sortTickets (tickets, selectedTabId) {
  return tickets.slice().sort((ticket1, ticket2) => {
    if (selectedTabId === 'cheap') {
      return ticket1.price - ticket2.price
    }
    if (selectedTabId === 'quick') {
      const duration1 = ticket1.segments[0].duration + ticket1.segments[1].duration
      const duration2 = ticket2.segments[0].duration + ticket2.segments[1].duration
      return duration1 - duration2
    }
    if (selectedTabId === 'optimal') {
      const optimal1 = ticket1.segments[0].duration + ticket1.segments[1].duration + ticket1.price
      const optimal2 = ticket2.segments[0].duration + ticket2.segments[1].duration + ticket2.price
      return optimal1 - optimal2
    }
  })
}


SerpMediator.propTypes = {
  tickets: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  selectedTabId: PropTypes.string.isRequired,
}


const mapStateToProps = (state) => ({
  tickets: state.tickets,
  filters: state.filters,
  selectedTabId: state.selectedTabId,
})


export default connect(mapStateToProps, null)(SerpMediator)
