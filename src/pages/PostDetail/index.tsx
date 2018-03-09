import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'

import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import './index.scss'
interface DetailRouteProps {
  slug: string
}

interface DetailProps extends RouteComponentProps<DetailRouteProps> {}

interface PostDetailStates {
  post?: IBlog.Post
  slug: string
  isLoading: boolean
}

class PostDetail extends React.Component<DetailProps> {
  state: PostDetailStates

  constructor(props: DetailProps) {
    super(props)
    
    this.state = {
      slug: props.match.params.slug,
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.fetchPostData()

    this.setState({
      isLoading: false
    })
  }

  render() {
    const {
      post,
      isLoading,
    } = this.state
    
    if (isLoading) return 'Loading...'

    if (!post) return 'Post does not exist.'

    const publishTime = new Date(post.publish_at)
    const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' });
    const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

    const renderTags = () => {
      const tagsLength = post.tags.length

      const renderTagsContent = post.tags.map((tag, index) => {
        return (
          <Link
            className="post__tag"
            to={`/tags/${tag.slug}`}
            key={tag.slug}
          >
            {tag.name}
          </Link>
        )
      })

      return tagsLength ? (
          <div className="post__tags">{renderTagsContent}</div>
        ) : null
    }

    return (
      <div className="post">
        <div className="post__title">{post.title}</div>
        <div className="post__info">
          {post.category ? post.category.title : null}{post.category ? '·' : null}{displayPublishTime}
        </div>
        <div
          className="post__content"
          dangerouslySetInnerHTML={{
            __html: post.content
          }}
        />
        {renderTags()}
      </div>
    )
  }

  private async fetchPostData() {
    try {
      const response: AxiosResponse<IResponse.PostDetail>
        = await http.get(`/blog/posts/${this.state.slug}`)
      
      this.setState({
        post: response.data,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export default PostDetail