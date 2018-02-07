import * as React from 'react'
import './App.css'

import Routes from 'routes/index'
import NavHeader from 'components/NavHeader/index'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <NavHeader />
        <div className="content">
          <Routes />
        </div>
      </div>
    )
  }
}

export default App
