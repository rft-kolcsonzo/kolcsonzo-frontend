import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable, { Map } from 'immutable'

import { Title } from '../Header'
import { APIContext } from '../../commons'
import OrderForm from '../OrderForm'
import Spinner from '../Spinner'

export default class OrdersFormPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  state = {
    order: null,
    cars: null,
  }

  static contextType = APIContext

  get orderId() {
    return (this.props.match && this.props.match.params.id) || null
  }

  componentDidMount() {
    if (this.orderId) {
      this.context
        .fetchOrder(this.orderId)
        .then(order => this.setState({ order: Immutable.fromJS(order) }))
    } else {
      this.setState({ order: Map() })
    }

    this.context
      .fetchCars({ available: true })
      .then(cars => this.setState({ cars: Immutable.fromJS(cars) }))
  }

  render() {
    const { order, cars } = this.state

    if (!order || !cars) {
      return <Spinner size="big" />
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
