import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import marked from 'utils/marked'

import $http from 'services/http/http'
import setTitle from 'utils/set-title'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import 'styles/solarized-dark.css'
import './index.scss'
import 'styles/markdown.scss'

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

  async componentWillMount() {
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
    const publishDate = publishTime.toLocaleString('zh-cn', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const displayPublishTime = `${publishDate}`

    const renderTags = () => {
      const tagsLength = post.tags.length

      const renderTagsContent = post.tags.map((tag, index) => {
        return (
          <Link
            className="post__tag"
            to={`/tag/${tag}`}
            key={tag}
          >
            {tag}
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
          {post.category ? post.category : null}{post.category ? ' · ' : null}{displayPublishTime}
        </div>
        <div
          className="post__content markdown"
          dangerouslySetInnerHTML={{
            __html: marked(post.content)
          }}
        />
        {renderTags()}
      </div>
    )
  }

  private async fetchPostData() {
    try {
      const response: AxiosResponse<IResponse.PostDetailResponse>
        = await $http.get(`/blog/post/${this.state.slug}`)
      
      const result = response.data.result
      
      const title = `${result.title.substring(0, 8)}${result.title.length > 8 ? '...' : ''} | 不唠嗑`

      setTitle(title)

      return this.setState({
        post: result,
      })
    } catch (error) {
      return console.error(error)
    }
  }
}

export default PostDetail