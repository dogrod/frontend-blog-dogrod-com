import * as React from 'react'

import Card from '@/components/card'

import CommentEditor from './editor'

import './index.scss'

const PREFIX_CLASS = 'comment'

class Comment extends React.Component {
  render() {
    return (
      <Card className={PREFIX_CLASS}>
        <h2>评论</h2>
        <CommentEditor />
      </Card>
    )
  }
}

export default Comment
