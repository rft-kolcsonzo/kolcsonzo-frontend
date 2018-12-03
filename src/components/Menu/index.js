import Menu from './component'
import { connect } from 'react-redux'

import { setMenuVisibility } from '../../actions'

export default connect(
  state => ({
    visible: state.app.get('menuOpen'),
  }),
  dispatch => ({
    closeMenu: () => dispatch(setMenuVisibility(false)),
  })
)(Menu)
