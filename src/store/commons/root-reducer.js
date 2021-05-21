const initialState = {  
  selectedTabId: 'cheap', // 'cheap' | 'quick' | 'optimal'
  filters: {
    'all': false,
    '0-stop': false,
    '1-stop': false,
    '2-stop': false,
    '3-stop': false,
  },
  tickets: [],
}


function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'set-state':
      return action.newState

    default:
      return state
  }
}


export default rootReducer
