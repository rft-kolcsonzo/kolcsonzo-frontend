import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import MenuButton from '../MenuButton'
import BackIcon from '../../assets/img/back.svg'
import './style.scss'
import IconButton from '../IconButton'

export { default as Title } from './Title'

function Header({ title, canGoBack, history }) {
  function handleBackClick() {
    history.goBack()
  }

  return (
    <div className="header">
      <div className="left">
        <IconButton
          className={[
            'back-button',
            canGoBack && history.length ? 'visible' : '',
          ].join(' ')}
          src={BackIcon}
          onClick={handleBackClick}
        />
        <h1>{title}</h1>
      </div>
      <MenuButton className="menu-btn" />
    </div>
  )
}

export default withRouter(
  connect(state => ({
    title: state.app.get('title'),
    canGoBack: state.app.get('canGoBack'),
  }))(React.memo(Header))
)
