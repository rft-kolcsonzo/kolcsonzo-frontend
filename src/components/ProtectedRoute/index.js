import { connect } from 'react-redux'
import ProtectedRoute from './component'

export default connect(state => ({
  isAuthenticated: state.app.get('authenticated'),
}))(ProtectedRoute)
