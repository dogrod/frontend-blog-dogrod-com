import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { UserConsumer, UserProfile, UserAction, UserActionType } from '@/context/user'
import Logo from '@/components/logo'

import './index.scss'

const PREFIX_CLASS = 'header'

class NavBar extends React.Component {
  dispatch: (action: UserAction) => void

  handleLogOut = () => {
    this.dispatch({
      type: UserActionType.LOGOUT,
      payload: { username: '', email: '' }
    })
  }

  renderProfileOrLogin = (isLoggedIn: boolean, profile: UserProfile) => {
    const className = classNames({
      [`${PREFIX_CLASS}__user`]: true,
      [`${PREFIX_CLASS}__user--logged`]: isLoggedIn,
      [`${PREFIX_CLASS}__user--unlogged`]: !isLoggedIn,
    })

    return isLoggedIn ? (
      <div className={className}>
        <span>{profile.username}</span>
        <a onClick={this.handleLogOut}>退出</a>
      </div>
    ) : (
      <div className={className}>
        <Link to="/login">登录</Link>
        {/* TODO: sign up /
        <Link to="/signup">注册</Link> */}
      </div>
    )
  }

  renderTopBar = () => {
    return (
      <div className={`${PREFIX_CLASS}__meta-bar`}>
        <Logo />
      </div>
    )
  }

  renderNavBar = () => {
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
        <UserConsumer>{({ isLoggedIn, profile, dispatch }) => {
          this.dispatch = dispatch
          return this.renderProfileOrLogin(isLoggedIn, profile)}
        }</UserConsumer>
      </div>
    )
  }

  renderElement = () => (
    <div className={PREFIX_CLASS}>
      {this.renderTopBar()}
      {this.renderNavBar()}
    </div>
  )

  render() {
    return (
      <header className={`${PREFIX_CLASS}__wrapper`}>
        {this.renderElement()}
      </header>
    )
  }
}

export default NavBar
