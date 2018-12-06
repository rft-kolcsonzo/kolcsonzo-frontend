import React from 'react'
import IconButton from '../IconButton'
import HamburgerIcon from '../../assets/img/hamburger.svg'
import './style.scss'

function MenuButton({ toggleMenuVisibility }) {
  function handleClick() {
    toggleMenuVisibility()
  }

  return (
    <IconButton
      src={HamburgerIcon}
      onClick={handleClick}
      className="menu-btn"
    />
  )
}

export default React.memo(MenuButton)
