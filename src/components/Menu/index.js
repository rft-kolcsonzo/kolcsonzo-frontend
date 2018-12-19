import Menu from './component'
import { connect } from 'react-redux'

import { setMenuVisibility, setAuthState } from '../../actions'

export default connect(
  state => ({
    visible: state.app.get('menuOpen'),
    isAdmin: state.app.get('isAdmin'),
  }),
  dispatch => ({
    closeMenu: () => dispatch(setMenuVisibility(false)),
    logout: () => dispatch(setAuthState(false, false)),
  })
)(Menu)
