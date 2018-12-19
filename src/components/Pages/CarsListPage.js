import React, { Component } from 'react'
import Immutable, { List } from 'immutable'

import CarsList from '../CarsList'
import { APIContext } from '../../commons'
import NavButton from '../NavButton'
import { Title } from '../Header'

export default class UsersListPage extends Component {
  state = {
    cars: List(),
  }

  static contextType = APIContext

  constructor(props) {
    super(props)

    this.deleteCar = this.deleteCar.bind(this)
  }

  async componentDidMount() {
    this.setState({ cars: Immutable.fromJS(await this.context.fetchCars()) })
  }

  shouldComponentUpdate(_, nextState) {
    return !Immutable.is(this.state.cars, nextState.cars)
  }

  async deleteCar(carId) {
    this.setState({
      cars: this.state.cars.filter(user => user.get('car_id') !== carId),
    })

    await this.context.deleteCar(carId)

    this.setState({ cars: Immutable.fromJS(await this.context.fetchCars()) })
  }

  render() {
    return (
      <>
        <Title>Gépkocsipark</Title>
        <NavButton to="/-/cars/create">Új gépkocsi</NavButton>
        <CarsList users={this.state.cars} deleteCar={this.deleteCar} />
      </>
    )
  }
}
