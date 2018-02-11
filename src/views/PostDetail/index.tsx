import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { AxiosResponse } from 'axios'

import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import './index.scss'
interface DetailRouterProps {
  slug: string
}

interface DetailProps extends RouteComponentProps<DetailRouterProps> {}

interface PostDetailStates {
  post?: IBlog.Post
  slug: string
}

class PostDetail extends React.Component<DetailProps> {
  state: PostDetailStates

  constructor(props: DetailProps) {
    super(props)
    
    this.state = {
      slug: props.match.params.slug
    }
  }

  async componentDidMount() {
    try {
      const response: AxiosResponse<IResponse.PostDetail>
        = await http.get(`/blog/posts/${this.state.slug}`)

      this.setState({
        post: response.data
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {
      post
    } = this.state

    if (!post) {
      return 'Post does not exist.'
    }

    const publishTime = new Date(post.publish_at)
    const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' });
    const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

    const renderTags = () => {
      const tagsLength = post.tags.length

      const renderTagsContent = post.tags.map((tag, index) => {
        return (
          <span key={tag.slug}>
            <a className="post__tag">{tag.name}</a>
            {index !== tagsLength - 1 ? ', ' : null}
          </span>
        )
      })

      return tagsLength ? (
          <div className="post__tag">Tag{tagsLength > 1 ? 's' : null}
          : {renderTagsContent}</div>
        ) : null
    }

    return (
      <div className="post">
        <div className="post__title">{post.title}</div>
        <div className="post__publish-time">{displayPublishTime}</div>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{
            __html: post.content
          }}
        />
        <div className="post__category">Category: {post.category.title}</div>
        {renderTags()}
      </div>
    )
  }
}

export default PostDetail