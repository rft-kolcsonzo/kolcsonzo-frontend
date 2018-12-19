import {
  SET_MENU_VISIBILITY,
  TOGGLE_MENU_VISIBILITY,
  SET_TITLE,
  SET_AUTH_STATE,
} from '../action-types'

export const toggleMenuVisibility = () => ({
  type: TOGGLE_MENU_VISIBILITY,
})

export const setMenuVisibility = visible => ({
  type: SET_MENU_VISIBILITY,
  payload: visible,
})

export const setTitle = title => ({
  type: SET_TITLE,
  payload: title,
})

export const setAuthState = (isAuthenticated, isAdmin = false) => ({
  type: SET_AUTH_STATE,
  payload: { isAuthenticated, isAdmin },
})
