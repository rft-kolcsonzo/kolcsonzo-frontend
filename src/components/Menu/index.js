import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { version } from '../../../package.json'
import GithubIcon from '../../assets/img/github.svg'

export default class Menu extends PureComponent {
  render() {
    return (
      <div className="menu-container">
        <nav>
          <ul>
            <li>
              <Link to="/users">Felhasználók</Link>
            </li>
            <li>
              <Link to="/cars">Gépkocsipark</Link>
            </li>
            <li>
              <Link to="/orders">Bérlések</Link>
            </li>
            <li className="separated">
              <Link to="/logout">Kijelentkezés</Link>
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
