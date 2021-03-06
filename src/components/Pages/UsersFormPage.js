import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable, { Map } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import UsersForm from '../UsersForm'
import Spinner from '../Spinner'

export default class UsersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    user: null,
  }

  static contextType = APIContext

  get userId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  async componentDidMount() {
    if (this.userId) {
      this.setState({
        user: Immutable.fromJS(await this.context.fetchUser(this.userId)),
      })
      return
    }

    this.setState({ user: Map() })
  }

  render() {
    const { user } = this.state

    if (!user) {
      return <Spinner size="big" />
    }

    return (
      <>
        <Title canGoBack>
          {this.userId ? 'Felhasználó módosítása' : 'Felhasználó létrehozása'}
        </Title>
        <UsersForm user={this.state.user} newUser={!this.userId} />
      </>
    )
  }
}
