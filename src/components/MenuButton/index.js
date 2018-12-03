import MenuButton from './component'
import { connect } from 'react-redux'
import { toggleMenuVisibility } from '../../actions'

export default connect(
  state => ({
    menuVisible: state.app.get('menuOpen'),
  }),
  dispatch => ({
    toggleMenuVisibility: visible => dispatch(toggleMenuVisibility()),
  })
)(MenuButton)
