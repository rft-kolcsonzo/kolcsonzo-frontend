import React, { Component } from 'react'
import Immutable, { List } from 'immutable'

import OrderList from '../OrderList'
import { APIContext } from '../../commons'
import NavButton from '../NavButton'
import { Title } from '../Header'

export default class OrdersListPage extends Component {
  state = {
    orders: List(),
  }

  static contextType = APIContext

  constructor(props) {
    super(props)

    this.deleteOrder = this.deleteOrder.bind(this)
  }

  async componentDidMount() {
    this.setState({
      orders: Immutable.fromJS(await this.context.fetchOrders()),
    })
  }

  shouldComponentUpdate(_, nextState) {
    return !Immutable.is(this.state.orders, nextState.orders)
  }

  async deleteOrder(orderId) {
    this.setState({
      users: this.state.orders.filter(
        order => order.get('order_id') !== orderId
      ),
    })

    await this.context.deleteOrder(orderId)

    this.setState({
      orders: Immutable.fromJS(await this.context.fetchOrders()),
    })
  }

  render() {
    return (
      <>
        <Title>Bérlések</Title>
        <NavButton to="/-/orders/create">Új bérlés</NavButton>
        <OrderList
          orders={this.state.orders}
          deleteOrder={this.deleteOrder}
          getPrintUrl={id => this.context.urlForOrderPdf(id)}
        />
      </>
    )
  }
}
