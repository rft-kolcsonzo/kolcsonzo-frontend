import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import CarsForm from '../CarsForm'
import Spinner from '../Spinner'

export default class UsersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static contextType = APIContext

  state = {
    car: null,
  }

  async componentDidMount() {
    if (this.carId) {
      this.setState({ car: Map(await this.context.fetchCar(this.carId)) })
      return
    }

    this.setState({ car: Map({}) })
  }

  get carId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  render() {
    if (!this.state.car) {
      return <Spinner size="big" />
    }

    return (
      <>
        <Title canGoBack>
          {this.carId ? 'Gépkocsi módosítása' : 'Gépkocsi létrehozása'}
        </Title>
        <CarsForm car={this.state.car} isNew={!this.carId} />
      </>
    )
  }
}
