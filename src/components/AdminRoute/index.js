import { connect } from 'react-redux'
import AdminRoute from './component'

export default connect(state => ({
  isAdmin: state.app.get('isAdmin'),
}))(AdminRoute)
