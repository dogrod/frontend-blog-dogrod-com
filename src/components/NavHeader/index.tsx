import * as React from 'react'

import logo from 'assets/images/icon_d.svg'

import './index.css'

class NavHeader extends React.Component {
  render() {
    return (
      <header>
        <a className="header__logo"  href="/">
          <img src={logo} />
        </a>
        <ul className="header__nav-list">
          <li>
            <a className="nav-list--active" href="/">BLOG</a>
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
