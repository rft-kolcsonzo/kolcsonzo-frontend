import React, { Component } from 'react'

import Table, { Row, Column, Header, HeaderColumn } from '../Table'

export default class DashboardHome extends Component {
  state = {
    data: [
      {
        id: 1,
        title: 'Első sor',
        stock: '10 db raktáron',
        type: 'másik cucc',
      },
      {
        id: 2,
        title: 'Második sor',
        stock: 'nincs raktáron',
        type: 'valami',
      },
    ],
  }

  constructor(props) {
    super(props)

    this.handleSorterChange = this.handleSorterChange.bind(this)
  }

  renderRow({ data, ...otherProps }) {
    return (
      <Row key={data.id} {...otherProps}>
        <Column>{data.title}</Column>
        <Column>{data.stock}</Column>
        <Column>{data.type}</Column>
        <Column>controls</Column>
      </Row>
    )
  }

  handleSorterChange(sorterIndex, direction) {
    switch (sorterIndex) {
      default:
      case 0:
        this.setState({
          data: this.state.data.sort((a, b) => {
            const cmp = a.title < b.title ? -1 : 1

            if (direction === 'asc') {
              return cmp
            }

            return cmp * -1
          }),
        })
        break
    }
  }

  render() {
    return (
      <div>
        <Table
          data={this.state.data}
          renderRow={this.renderRow}
          selectable
          onSorterChange={this.handleSorterChange}
        >
          <Header>
            <HeaderColumn sortable sorter id="title">
              Product
            </HeaderColumn>
            <HeaderColumn>Stock</HeaderColumn>
            <HeaderColumn>Type</HeaderColumn>
          </Header>
        </Table>
      </div>
    )
  }
}
