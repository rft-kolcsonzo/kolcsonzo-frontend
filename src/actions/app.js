import { SET_MENU_VISIBILITY, TOGGLE_MENU_VISIBILITY } from '../action-types'

export const toggleMenuVisibility = () => ({
  type: TOGGLE_MENU_VISIBILITY,
})

export const setMenuVisibility = visible => ({
  type: SET_MENU_VISIBILITY,
  payload: visible,
})
