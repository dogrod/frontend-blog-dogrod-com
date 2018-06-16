import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes'
import './styles/common.scss'

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          {routes}
        </Switch>
      </Router>
    )
  }
}

export default App
