import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import './style.scss'

export default class Table extends React.Component {
  static propTypes = {
    sortable: PropTypes.bool,
    selectable: PropTypes.bool,
    data: PropTypes.any.isRequired,
    header: PropTypes.array,
    renderRow: PropTypes.func.isRequired,
    onSorterChange: PropTypes.func,
  }

  static defaultProps = {
    sortable: false,
    selectable: false,
  }

  state = {
    selectedRows: [],
    sorter: undefined,
    direction: 'asc',
  }

  get sortable() {
    return this.props.sortable
  }

  get selectable() {
    return this.props.selectable
  }

  get sorter() {
    return this.state.sorter
  }

  get direction() {
    return this.state.direction
  }

  get allRowsSelected() {
    return (
      this.props.data.filter(
        (_, index) =>
          !!this.state.selectedRows.filter(
            selectedIndex => selectedIndex === index
          ).length
      ).length === this.props.data.length
    )
  }

  /**
   * Selects a specific row.
   * @param {number} index Index of the row to be selected.
   */
  selectRow(index) {
    this.setState({ selectedRows: [...this.state.selectedRows, index] })
  }

  /**
   * Deselects a specific row.
   * @param {number} index Index of the row to be selected.
   */
  deselectRow(index) {
    this.setState({
      selectedRows: this.state.selectedRows.filter(
        selectedIndex => selectedIndex !== index
      ),
    })
  }

  selectAllRow() {
    this.setState({
      selectedRows: this.props.data.map((_, index) => index),
    })
  }

  deselectAllRow() {
    this.setState({
      selectedRows: [],
    })
  }

  sortBy(headerIndex, direction = 'asc') {
    this.setState({ sorter: headerIndex, direction })

    if (typeof this.props.onSorterChange === 'function') {
      this.props.onSorterChange(headerIndex, direction)
    }
  }

  get header() {
    const { selectable, sortable } = this.props
    const header = React.Children.toArray(this.props.children)
      .filter(child => child.type === Header)
      .pop()

    if (header) {
      return React.cloneElement(header, { selectable, sortable, table: this })
    }

    return null
  }

  render() {
    const { selectable, sortable, renderRow, data } = this.props

    return (
      <table className="table">
        {this.header}
        <tbody>
          {data.map((rowData, index) =>
            renderRow({
              selectable,
              sortable,
              index,
              data: rowData,
              table: this,
              selected: !!this.state.selectedRows.filter(
                selectedIndex => selectedIndex === index
              ).length,
            })
          )}
        </tbody>
      </table>
    )
  }
}
