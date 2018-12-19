import { createReducer } from './utils'
import { Map } from 'immutable'
import {
  SET_MENU_VISIBILITY,
  TOGGLE_MENU_VISIBILITY,
  SET_TITLE,
  SET_AUTH_STATE,
} from '../action-types'

const initialState = new Map({
  title: '',
  menuOpen: false,
  authenticated: false,
  isAdmin: false,
})

export default createReducer(initialState, {
  [SET_MENU_VISIBILITY]: (state, visible) => state.set('menuOpen', visible),
  [TOGGLE_MENU_VISIBILITY]: state =>
    state.set('menuOpen', !state.get('menuOpen')),
  [SET_TITLE]: (state, title) => state.set('title', title),
  [SET_AUTH_STATE]: (state, { isAuthenticated, isAdmin }) =>
    state.set('authenticated', isAuthenticated).set('isAdmin', isAdmin),
})
