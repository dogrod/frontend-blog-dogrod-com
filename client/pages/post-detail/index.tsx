import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'

interface PropTypes extends RouteComponentProps<{ slug: string }> {}

interface StateTypes {
  post?: BlogTypes.Post
  slug: string
  isLoading: boolean
}

const PREFIX_CLASS = 'post-detail'

class PostDetail extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      slug: props.match.params.slug,
      isLoading: false
    }
  }

  async componentDidMount() {
    this.setLoadingStatus(true)

    try {
      const post = await this.fetchPostDetailData()

      this.setState({
        post
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setLoadingStatus(false)
    }
  }

  async fetchPostDetailData() {
    const { slug } = this.state
    const url = `${api.getPosts}/${slug}`
    
    try {
      const response: any = await http.get(url)

      return response.result
    } catch (error) {
      throw error
    }
  }

  setLoadingStatus(isLoading: boolean) {
    this.setState({ isLoading })
  }

  render() {
    const { post } = this.state

    const renderPostContent = (postData: BlogTypes.Post) => [
      <div className={`${PREFIX_CLASS}__title`}>{postData.title}</div>,
      <div className={`${PREFIX_CLASS}__category`}>{postData.category}</div>,
      <div className={`${PREFIX_CLASS}__content`}>{postData.content}</div>,
      <div className={`${PREFIX_CLASS}__tags`}>
        {
          postData.tags.map(tag => (<a>{tag}</a>))
        }
      </div>,
    ]

    return (
      <div className={PREFIX_CLASS}>
        {
          post ? renderPostContent(post) : null
        }
      </div>
    )
  }
}

export default PostDetail
