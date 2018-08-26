import * as React from 'react'
import Immutable from 'immutable'

import Card from '@/components/card'

import CommentEditor from './editor'

import { convertTimeFormat } from '@/utils'
import BlogTypes from '@/types/blog'

import './index.scss'
import Divider from '@/components/divider';

interface PropTypes {
  comments: Immutable.List<BlogTypes.Comment>
  onSubmit: (comment: string) => Promise<any>
}

const PREFIX_CLASS = 'comment'

class Comment extends React.Component<PropTypes> {
  renderCommentList = () => this.props.comments.map(comment => (
    <React.Fragment key={comment.id}>
      <Divider />
      <div className={`${PREFIX_CLASS}__item`}>
        <div className={`${PREFIX_CLASS}__author`}>
          {comment.author.username}
        </div>
        <div className={`${PREFIX_CLASS}__create-time`}>
          {convertTimeFormat(comment.createAt)}
        </div>
        <p>
          {comment.content}
        </p>
      </div>
    </React.Fragment>
  ))

  render() {
    return (
      <Card className={PREFIX_CLASS}>
        <h2>评论</h2>
        <CommentEditor onSubmit={this.props.onSubmit} />
        {this.renderCommentList()}
      </Card>
    )
  }
}

export default Comment
