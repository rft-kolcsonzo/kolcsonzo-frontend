import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import CarsForm from '../CarsForm'

export default class UsersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static contextType = APIContext

  state = {
    car: Map({}),
  }

  async componentDidMount() {
    if (this.carId) {
      this.setState({ car: await this.context.fetchCar(this.carId) })
    }
  }

  get carId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  render() {
    return (
      <>
        <Title>
          {this.userId ? 'Gépkocsi módosítása' : 'Gépkocsi létrehozása'}
        </Title>
        <CarsForm car={this.state.car} />
      </>
    )
  }
}
