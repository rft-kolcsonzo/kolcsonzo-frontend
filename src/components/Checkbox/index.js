import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TickIcon from '../../assets/img/tick.svg'
import './style.scss'

export default class Checkbox extends Component {
  static propTypes = {
    label: PropTypes.node,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    checked: undefined,
    defaultChecked: undefined,
  }

  state = {
    checked: false,
  }

  constructor(props) {
    super(props)

    if (typeof props.checked !== 'undefined') {
      this.state.checked = props.checked
    } else if (typeof props.defaultChecked !== 'undefined') {
      this.state.checked = props.defaultChecked
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.checked !== nextProps.checked ||
      this.state.checked !== nextState.checked
    ) {
      return true
    }

    return false
  }

  handleChange({ target: { checked } }) {
    const { onChange } = this.props
    this.setState({ checked })

    if (typeof onChange === 'function') {
      onChange(checked)
    } else if (typeof this.props.checked !== 'undefined') {
      console.error(
        'Warning: Checkbox is controlled, you should set the onChange callback.'
      )
    }
  }

  handleClick() {
    this.handleChange({ target: { checked: !this.state.checked } })
  }

  get checked() {
    return this.state.checked
  }

  static getDerivedStateFromProps({ checked }, state) {
    if (typeof checked !== 'undefined') {
      return { checked }
    }

    return null
  }

  render() {
    const { label, defaultChecked: _, ...otherProps } = this.props
    const { checked } = this.state

    return (
      <span className="checkbox-container" onClick={this.handleClick}>
        <input
          {...otherProps}
          type="checkbox"
          checked={checked}
          onChange={this.handleChange}
        />
        <span className={`checkbox${checked ? ' checked' : ''}`}>
          <img src={TickIcon} alt="" />
        </span>
        {label ? <span className="label">{label}</span> : null}
      </span>
    )
  }
}
