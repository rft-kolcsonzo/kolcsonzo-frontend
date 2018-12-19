import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { version } from '../../../package.json'

import IconButton from '../IconButton'
import GithubIcon from '../../assets/img/github.svg'
import CloseIcon from '../../assets/img/close.svg'
import './style.scss'
import { APIContext } from '../../commons/api.js'

class Menu extends Component {
  static contextType = APIContext

  constructor(props) {
    super(props)

    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleCloseClick() {
    this.props.closeMenu()
  }

  handleLogoutClick() {
    this.props.closeMenu()
    this.props.logout()
    this.context.setToken(null)
  }

  render() {
    const { visible, className, isAdmin } = this.props
    const classNames = ['menu-container', className, visible ? 'visible' : '']
      .join(' ')
      .trim()

    return (
      <div className={classNames}>
        <IconButton
          src={CloseIcon}
          className="close-btn"
          onClick={this.handleCloseClick}
        />
        <nav>
          <ul>
            {isAdmin && (
              <li>
                <NavLink
                  to="/-/users"
                  onClick={this.handleCloseClick}
                  className="menu-button"
                  activeClassName="active"
                >
                  Dolgozók
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/-/cars"
                onClick={this.handleCloseClick}
                className="menu-button"
                activeClassName="active"
              >
                Gépkocsipark
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/-/orders"
                onClick={this.handleCloseClick}
                className="menu-button"
                activeClassName="active"
              >
                Bérlések
              </NavLink>
            </li>
            <li className="separated">
              <button className="menu-button" onClick={this.handleLogoutClick}>
                Kijelentkezés
              </button>
            </li>
          </ul>
        </nav>

        <div className="footer">
          <div>
            <h2>
              CarRental<span className="version">{version}</span>
            </h2>
            <h3>
              by <span className="team">ClearCodeSolutions</span>
            </h3>
          </div>
          <div>
            <a
              href="https://github.com/rft-kolcsonzo/kolcsonzo-ui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={GithubIcon} alt="GitHub repo" title="GitHub repo" />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default React.memo(Menu, (prevProps, nextProps) => {
  if (prevProps.visible !== nextProps.visible) {
    return false
  }
  const locationEquals = Object.keys(prevProps.location).every(
    key => prevProps.location[key] === nextProps.location[key]
  )
  if (!locationEquals) {
    return false
  }

  return true
})
