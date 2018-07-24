import * as React from 'react'

import { setTitle } from '@/utils'

class Tag extends React.Component {
  componentDidMount() {
    setTitle('标签')
  }

  render() {
    return (
      <div>
        Tag
      </div>
    )
  }
}

export default Tag
