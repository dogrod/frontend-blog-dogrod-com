import * as React from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/icon_d.svg'
import './index.scss'

const PREFIX_CLASS = 'header'

class NavBar extends React.Component {
  renderTopBar() {
    return (
      <div className={`${PREFIX_CLASS}__top-bar`}>
        <Link to="/" className={`${PREFIX_CLASS}__logo`}>
          <img src={logo} />
        </Link>
      </div>
    )
  }

  renderNavBar() {
    return (
      <div className={`${PREFIX_CLASS}__nav-bar`}>
        <ul>
          <li>
            <Link to="/" className={`${PREFIX_CLASS}--active`}>BLOG</Link>
          </li>
          <li>
            <a onClick={() => alert('Coming soon')}>FMF.BUZZ</a>
          </li>
          <li>
            <a href="//www.github.com/dogrod" target="_blank">GIT HUB</a>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <header className={PREFIX_CLASS}>
        {this.renderTopBar()}
        {this.renderNavBar()}
      </header>
    )
  }
}

export default NavBar
