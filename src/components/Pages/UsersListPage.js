import React, { Component } from 'react'
import Immutable, { List } from 'immutable'

import UsersList from '../UsersList'
import { APIContext } from '../../commons'
import NavButton from '../NavButton'
import { Title } from '../Header'

export default class UsersListPage extends Component {
  state = {
    users: List(),
  }

  static contextType = APIContext

  async componentDidMount() {
    this.setState({ users: Immutable.fromJS(await this.context.fetchUsers()) })
  }

  shouldComponentUpdate(_, nextState) {
    return !Immutable.is(this.state.users, nextState.users)
  }

  render() {
    return (
      <>
        <Title>Felhasználók</Title>
        <NavButton to="/-/users/create">Új felhasználó</NavButton>
        <UsersList users={this.state.users} />
      </>
    )
  }
}
