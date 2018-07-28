import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/login'
import Signup from './pages/signup'
import { UserProvider } from './context/user'
import CheckLogin from '@/services/check-login'

import Routes from './routes'
import '@/assets/styles/common.scss'

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <CheckLogin />
        <Router>
          <div className="app">
            <Switch>
              <Route key="login" path="/login" component={Login} />
              <Route key="signup" path="/signup" component={Signup} />
              <Route key="root" path="/" component={Routes} />
              <Redirect key="not-found" to="/" />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    )
  }
}

export default App
