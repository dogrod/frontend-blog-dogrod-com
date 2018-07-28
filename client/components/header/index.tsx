import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { UserConsumer, UserProfile } from '@/context/user'
import Logo from '@/components/logo'

import './index.scss'

const PREFIX_CLASS = 'header'

class NavBar extends React.Component {
  renderProfileOrLogin(isLoggedIn: boolean, profile: UserProfile) {
    const className = classNames({
      [`${PREFIX_CLASS}__user`]: true,
      [`${PREFIX_CLASS}__logged`]: isLoggedIn,
      [`${PREFIX_CLASS}__unlogged`]: !isLoggedIn,
    })

    return isLoggedIn ? (
      <div className={className}>
        {profile.username}
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
        <Logo />
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
        <UserConsumer>{({ isLoggedIn, profile }) => { return this.renderProfileOrLogin(isLoggedIn, profile)}}</UserConsumer>
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
