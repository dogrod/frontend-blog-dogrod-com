import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import NavBar from '@/components/nav-bar'

import routes from './routes'
import '@/assets/styles/common.scss'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="app">
          <NavBar />
          <div className="content">
            <Switch>
              {routes}
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
