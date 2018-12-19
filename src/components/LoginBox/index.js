import { connect } from 'react-redux'
import LoginBox from './component'

import { setAuthState } from '../../actions'

export default connect(
  null,
  dispatch => ({
    setAuthState: (isAuthenticated, isAdmin) =>
      dispatch(setAuthState(isAuthenticated, isAdmin)),
  })
)(LoginBox)
