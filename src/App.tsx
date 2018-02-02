import * as React from 'react'
import './App.css'

import Routes from 'views/Routes/index'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    )
  }
}

export default App;
