import React from 'react'
import IconButton from '../IconButton'
import HamburgerIcon from '../../assets/img/hamburger.svg'
import './style.scss'

export default function MenuButton() {
  return <IconButton src={HamburgerIcon} className="menu-btn" />
}
