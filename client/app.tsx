import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { UserProvider } from './context/user'
import CheckLogin from '@/services/check-login'
import DynamicLoad from '@/services/dynamic-load'

import Post from '@/pages/post'
import '@/assets/styles/common.scss'

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <CheckLogin />
        <Router>
            <Switch>
              <Route
                key="login"
                path="/login"
                component={DynamicLoad(() => import('@/pages/user/login'))}
              />
              <Route
                key="signup"
                path="/signup"
                component={DynamicLoad(() => import('@/pages/user/signup'))}
              />
              <Route
                key="post"
                path="/"
                component={Post}
              />
              <Redirect key="not-found" to="/" />
            </Switch>
        </Router>
      </UserProvider>
    )
  }
}

export default App
