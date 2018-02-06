import * as React from 'react'
import { Link } from 'react-router-dom'
import logo from 'assets/images/icon_d.svg'

import './index.css'

class NavHeader extends React.Component {
  render() {
    return (
      <header>
        <Link to="/" className="header__logo">
          <img src={logo} />
        </Link>
        <ul className="header__nav-list">
          <li>
            <Link to="/" className="nav-list--active">BLOG</Link>
          </li>
          <li>
            <a href="//www.for-my-ferrari.com/" target="_blank">FOR MY FERRARI</a>
          </li>
          <li>
            <a href="//www.github.com/dogrod" target="_blank">GIT HUB</a>
          </li>
        </ul>
      </header>
    )
  }
}

export default NavHeader
