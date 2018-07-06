import * as React from 'react'

class App extends React.Component {
  render() {
    return (
      <ul>
        {this.props.children}
      </ul>
    )
  }
}

export default App
