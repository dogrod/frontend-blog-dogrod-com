import * as React from 'react'

import { setTitle } from '@/utils'

class Signup extends React.Component {
  componentDidMount() {
    setTitle('注册')
  }

  render() {
    return (
      <div>
        <h2>注册</h2>
      </div>
    )
  }
}

export default Signup
