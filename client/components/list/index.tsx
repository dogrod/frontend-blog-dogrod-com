import * as React from 'react'
import './index.scss'

const PREFIX_CLASS = 'list'

class App extends React.Component {
  render() {
    return (
      <ul className={PREFIX_CLASS}>
        {this.props.children}
      </ul>
    )
  }
}

export default App
