import React from 'react'
import { NavLink } from 'react-router-dom'
import { version } from '../../../package.json'

import IconButton from '../IconButton'
import GithubIcon from '../../assets/img/github.svg'
import CloseIcon from '../../assets/img/close.svg'
import './style.scss'

function Menu({ visible, closeMenu, className }) {
  const classNames = ['menu-container', className, visible ? 'visible' : '']
    .join(' ')
    .trim()

  function handleCloseClick() {
    closeMenu()
  }

  return (
    <div className={classNames}>
      <IconButton
        src={CloseIcon}
        className="close-btn"
        onClick={handleCloseClick}
      />
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard/users" activeClassName="active">
              Felhasználók
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cars" activeClassName="active">
              Gépkocsipark
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/orders" activeClassName="active">
              Bérlések
            </NavLink>
          </li>
          <li className="separated">
            <NavLink to="/logout" activeClassName="active">
              Kijelentkezés
            </NavLink>
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
