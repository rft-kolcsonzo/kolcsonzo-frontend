import { PureComponent } from 'react'

export default class ErrorBoundary extends PureComponent {
  state = {
    error: null,
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error) {
      return fallback
    }

    return children
  }
}
