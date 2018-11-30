import React from 'react'
import MenuButton from '../MenuButton'
import './style.scss'

export default function Header({ title }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <MenuButton className="menu-btn" />
    </div>
  )
}
