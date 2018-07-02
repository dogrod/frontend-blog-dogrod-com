import * as React from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/icon_d.svg'
import './index.scss'

const PREFIX_CLASS = 'nav-bar'

class NavBar extends React.Component {
  public render() {
    return (
      <header className={PREFIX_CLASS}>
        <Link to="/" className={`${PREFIX_CLASS}__logo`}>
          <img src={logo} />
        </Link>
        <div className={`${PREFIX_CLASS}__nav-list`}>
          <ul>
            <li>
              <Link to="/" className={`${PREFIX_CLASS}--active`}>BLOG</Link>
            </li>
            <li>
              <a onClick={() => alert('Coming soon...')}>FOR MY FERRARI</a>
            </li>
            <li>
              <a href="//www.github.com/dogrod" target="_blank">GIT HUB</a>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default NavBar
