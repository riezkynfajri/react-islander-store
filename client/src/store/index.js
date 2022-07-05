import { applyMiddleware, legacy_createStore as createStore } from "redux"
import thunk from "redux-thunk"

const initState = {
  buyers: [],
  items: [],
  transactions: [],
  summary: {},
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "getBuyers":
      return { ...state, buyers: action.payload }
    case "getItems":
      return { ...state, items: action.payload }
    case "getTransactions":
      return { ...state, transactions: action.payload }
    case "getSummary":
      return { ...state, summary: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store
