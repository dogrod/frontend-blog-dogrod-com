import * as React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import routes from './routes'

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
