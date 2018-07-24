import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/icon_d.svg'
import './index.scss'

interface StateProps {
  isLoggedIn: boolean
  profile: {
    username: string
    email: string
  }
}

const PREFIX_CLASS = 'header'

class NavBar extends React.Component<{}, StateProps> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false,
      profile: {
        username: '',
        email: '',
      }
    }
  }

  renderProfileOrLogin() {
    const { isLoggedIn, profile } = this.state

    const className = classNames({
      [`${PREFIX_CLASS}__user`]: true,
      [`${PREFIX_CLASS}__logged`]: isLoggedIn,
      [`${PREFIX_CLASS}__unlogged`]: !isLoggedIn,
    })

    return isLoggedIn ? (
      <div className={className}>
        <a>{profile.username}</a>
      </div>
    ) : (
      <div className={className}>
        <Link to="/login">登录</Link>
        /
        <Link to="/signup">注册</Link>
      </div>
    )
  }

  renderTopBar() {
    return (
      <div className={`${PREFIX_CLASS}__meta-bar`}>
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
        {this.renderProfileOrLogin()}
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
