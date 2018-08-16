import * as React from 'react'

import { setTitle } from '@/utils'

const PREFIX_CLASS = 'tag'

class Tag extends React.Component {
  componentDidMount() {
    setTitle('标签')
  }

  render() {
    return (
      <div className={`${PREFIX_CLASS} content`}>
        Tag
      </div>
    )
  }
}

export default Tag
