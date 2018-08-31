import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { UserProvider } from './context/user'
import CheckLogin from '@/services/check-login'

import Post from '@/pages/post'
import User from '@/pages/user'
import '@/assets/styles/common.scss'

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <CheckLogin />
        <Router>
            <Switch>
              <Route
                key="user"
                path="/user"
                component={User}
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
