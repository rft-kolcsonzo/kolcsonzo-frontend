import React from 'react'
import Header from '../Header'
import Menu from '../Menu'
import './style.scss'

export default function Dashboard({ children, location }) {
  return (
    <div className="fill-window dashboard">
      <div className="content-container">
        <Header title="Gépkocsipark" />
        <div className="content">{children}</div>
      </div>
      <Menu location={location} />
    </div>
  )
}
