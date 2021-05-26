import { nanoid } from 'nanoid/nanoid.js'
import { transaction } from '/store'


export default fetchAllTickets


async function fetchAllTickets () {
  const searchId = await fetchSearchId()
  while (true) { // почему while (true) ?
    const page = await fetchNextTicketsPage(searchId)
    if (page.stop) {
      break
    }

    const ticketList = page.tickets.map(t => ({
      ...t,
      id: nanoid(10),        
    }))
    transaction(s => s.tickets.push(...ticketList))
  }
}


async function fetchNextTicketsPage (searchId) {
  const page = await fetchFromAviasales(`/tickets?searchId=${searchId}`)
  return page
}


async function fetchSearchId () {
  const responseData = await fetchFromAviasales('/search')
  return responseData.searchId
}


async function fetchFromAviasales (path, attempt = 0) {
  if (attempt >= 4) {
    throw new Error('failed to fetch data from server afer 3 attempts')
  }

  const response = await fetch(`https://front-test.beta.aviasales.ru${path}`)
  if (response.status !== 200) {
    await sleep(200)
    return fetchFromAviasales(path, attempt + 1)
  }

  const data = await response.json()
  return data
}


function sleep (time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  })
}
