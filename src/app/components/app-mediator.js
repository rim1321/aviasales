import React, { useEffect } from 'react'
import ui from '/ui'
import { FiltersMediator } from '/filters'
import { SortingTabsMediator } from '/sorting-tabs'
import { SerpMediator } from '/serp'
import fetchAllTickets from '../commons/fetch-all-tickets'


function AppMediator () {
  useEffect(() => {
    fetchAllTickets()
  }, [])

  return (
    <ui.App
      filters={ <FiltersMediator /> }
      tabs={ <SortingTabsMediator /> }
      serp={ <SerpMediator /> }
    />
  )
}


export default AppMediator
