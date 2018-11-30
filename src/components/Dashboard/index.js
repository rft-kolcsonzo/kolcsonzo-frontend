import React from 'react'
import Header from '../Header'
import Menu from '../Menu'
import './style.scss'

export default function Dashboard({ children }) {
  return (
    <div className="fill-window dashboard">
      <Header title="Gépkocsipark" />
      <Menu />
      <div className="content">{children}</div>
    </div>
  )
}
