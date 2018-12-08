import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import UsersForm from '../UsersForm'

export default class UsersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static contextType = APIContext

  get userId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  render() {
    return (
      <>
        <Title>
          {this.userId ? 'Felhasználó módosítása' : 'Felhasználó létrehozása'}
        </Title>
        <UsersForm
          user={
            this.userId
              ? Map({
                  user_id: 1,
                  email: 'teszt@teszt.hu',
                  password: '34228a532093278fcdc65c3a1338482e8bdc44f6',
                  firstname: 'john',
                  lastname: 'snow',
                  profile_img: null,
                  is_admin: 1,
                  enabled_status: 1,
                  deleted: 0,
                })
              : Map()
          }
        />
      </>
    )
  }
}
