import { connect } from 'react-redux'
import LoginPage from './component'

export default connect(state => ({
  isAuthenticated: state.app.get('authenticated'),
}))(LoginPage)
