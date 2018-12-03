import React from 'react'
import IconButton from '../IconButton'
import HamburgerIcon from '../../assets/img/hamburger.svg'
import './style.scss'

export default function MenuButton({ toggleMenuVisibility }) {
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
