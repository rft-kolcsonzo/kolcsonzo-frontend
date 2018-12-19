import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable, { Map, List } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import OrderForm from '../OrderForm'

export default class OrdersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    order: null,
    cars: List(),
  }

  static contextType = APIContext

  get orderId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  componentDidMount() {
    this.context
      .fetchCars({ available: true })
      .then(cars => this.setState({ cars: Immutable.fromJS(cars) }))

    if (this.orderId) {
      this.context
        .fetchOrder(this.orderId)
        .then(order => this.setState({ order: Immutable.fromJS(order) }))

      return
    }

    this.setState({ order: Map() })
  }

  render() {
    const { order, cars } = this.state

    if (!order || !cars) {
      return null
    }

    return (
      <>
        <Title canGoBack>
          {this.orderId ? 'Bérlés módosítása' : 'Bérlés létrehozása'}
        </Title>
        <OrderForm order={order} cars={cars} isNew={!this.orderId} />
      </>
    )
  }
}
