import { createReducer } from './utils'
import { Map } from 'immutable'

const initialState = new Map({
  menuOpen: false,
  authenticated: false,
})

export default createReducer(initialState, {})
