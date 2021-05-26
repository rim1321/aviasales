import { storeController, transaction } from '/store'


export default {
  init,
}


function init () {
  applyUrlToState()
  updateUrlOnStateChange()
  applyUrlToStateOnBackNavigation()
}

// что будет если добавятся еще фильтры? например пагинация, поиск и тд..
function applyUrlToState () {
  const url = new URL(location.href)
  const store = storeController.getStore()
  const s = store.getState()

  // handle tab in search params
  const tab = url.searchParams.get('tab')
  if (tab) {
    const validTabs = ['cheap', 'quick', 'optimal']
    if (validTabs.includes(tab)) {
      transaction(s => s.selectedTabId = tab)
    }
  }

  // чекбокс "Все" выбранный и отжатый отображает одинаковый url
  // handle filters in search params
  const filterParams = url.searchParams.get('filters')
  const filterValues = filterParams ?
    filterParams.split('_').filter(v => v in s.filters) :
    []
  if (filterValues.length === 0) {
    transaction(s => {
      for (const key in s.filters) {
        s.filters[key] = true
      }
    })
  } else {
    transaction(s => {
      filterValues.forEach(v => {
        s.filters[v] = true
      })
    })
  }
}


function applyUrlToStateOnBackNavigation () {
  window.addEventListener('popstate', applyUrlToState)
}


function updateUrlOnStateChange () {
  const store = storeController.getStore()
  const s = store.getState()

  let filters = { ...s.filters }
  let selectedTabId = s.selectedTabId

  store.subscribe(() => {
    const s = store.getState()

    // check if filters or selectedTabId were changed
    let hasChanges = false
    if (selectedTabId !== s.selectedTabId) {
      hasChanges = true
    } else {
      for (const key in s.filters) {
        if (filters[key] === s.filters[key]) { continue }
        hasChanges = true
        break
      }
    }

    // no changes? => ignore
    if (!hasChanges) { return }

    // update values
    filters = { ...s.filters }
    selectedTabId = s.selectedTabId

    updateUrl(filters, selectedTabId)
  })
}


function updateUrl (filters, selectedTabId) {
  const url = new URL(location.href)

  let filtersQueryString
  if (filters.all) {
    filtersQueryString = ''
  } else {
    filtersQueryString = Object.keys(filters).filter(k => filters[k]).join('_')
  }

  if (filtersQueryString) {
    url.searchParams.set('filters', filtersQueryString)
  } else {
    url.searchParams.delete('filters')
  }


  if (selectedTabId !== 'cheap') {
    url.searchParams.set('tab', selectedTabId)
  } else {
    url.searchParams.delete('tab')
  }

  history.pushState(null, null, url)
}
