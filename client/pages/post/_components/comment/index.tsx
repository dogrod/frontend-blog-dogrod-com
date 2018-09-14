import * as React from 'react'
import { Link } from 'react-router-dom'
import Immutable from 'immutable'

import AnimatedCard from '../animated-card'

import CommentEditor from './editor'

import { convertTimeFormat } from '@/utils'
import BlogTypes from '@/types/blog'

import './index.scss'
import Divider from '@/components/divider';

interface PropTypes {
  isLogged: boolean
  comments: Immutable.List<BlogTypes.Comment>
  onSubmit: (comment: string) => Promise<any>
}

const PREFIX_CLASS = 'comment'

class Comment extends React.Component<PropTypes> {
  renderAddComment = () => {
    return this.props.isLogged
      ? <CommentEditor onSubmit={this.props.onSubmit} />
      : (
        <div>
          <Link to={`/user/login?redirect=${window.location.href}`}>登录</Link>
          或
          <Link to={`/user/signup?redirect=${window.location.href}`}>登录</Link>
          后发表评论
        </div>
      )
  }

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
      <AnimatedCard className={PREFIX_CLASS}>
        <h2>评论</h2>
        {this.renderAddComment()}
        {this.renderCommentList()}
      </AnimatedCard>
    )
  }
}

export default Comment
