import React from 'react'
import { connect } from 'react-redux'

import MenuButton from '../MenuButton'
import './style.scss'

export { default as Title } from './Title'

function Header({ title }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <MenuButton className="menu-btn" />
    </div>
  )
}

export default connect(state => ({ title: state.app.get('title') }))(
  React.memo(Header)
)
