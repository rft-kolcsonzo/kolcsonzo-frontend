import { createReducer } from './utils'
import { Map } from 'immutable'
import { SET_MENU_VISIBILITY, TOGGLE_MENU_VISIBILITY } from '../action-types'

const initialState = new Map({
  menuOpen: false,
  authenticated: false,
})

export default createReducer(initialState, {
  [SET_MENU_VISIBILITY]: (state, visible) => state.set('menuOpen', visible),
  [TOGGLE_MENU_VISIBILITY]: state =>
    state.set('menuOpen', !state.get('menuOpen')),
})
