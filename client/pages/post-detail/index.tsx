import * as React from 'react'
import classNames from 'classnames'
import update from 'immutability-helper'
import { RouteComponentProps } from 'react-router'

import Icon from '@/components/icon'
import Divider from '@/components/divider'

import api from '@/api'
import http from '@/utils/http'
import marked from '@/utils/marked'
import { convertTimeFormat, setTitle } from '@/utils'

import BlogTypes from '@/types/blog'

import './index.scss'

declare module 'react' {
  interface SVGAttributes<T> {
    ['xlink:href']?: string
  }
}

interface PropTypes extends RouteComponentProps<{ slug: string }> {}

interface StateTypes {
  post?: BlogTypes.Post
  slug: string
  isLoading: boolean
  disableLike: boolean
  activeLike: boolean
}

const PREFIX_CLASS = 'post-detail'

class PostDetail extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      slug: props.match.params.slug,
      isLoading: false,
      disableLike: false,
      activeLike: false,
    }
  }

  async componentDidMount() {
    this.setLoadingStatus(true)

    try {
      const post = await this.fetchPostDetailData()

      setTitle(post.title)      

      this.setState({
        post
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setLoadingStatus(false)
    }
  }

  /**
   * click like button event
   */
  handleClickLike = async () => {
    const { slug, disableLike} = this.state

    if (disableLike) {
      return
    }

    const url = `${api.getPosts}/${slug}/like`
    const data = {
      increment: 1,
    }

    this.setDisableLike(true)

    try {
      const result: any = await http.post(url, data)

      const likeCount = result.likes

      this.setLikeCount(likeCount)

      await this.triggerLikeSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      this.setDisableLike(false)
    }
  }

  /**
   * fetch post detail data
   * @returns promise instance
   */
  fetchPostDetailData = async () => {
    const { slug } = this.state
    const url = `${api.getPosts}/${slug}`
    
    try {
      const response: any = await http.get(url)

      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * set loading status
   * @param isLoading - loading status
   */
  setLoadingStatus = (isLoading: boolean) => {
    this.setState({ isLoading })
  }

  /**
   * set disable like
   * @param disableLike - disable like
   */
  setDisableLike = (disableLike: boolean) => {
    this.setState({ disableLike })
  }

  /**
   * set like count of post
   */
  setLikeCount = (likes: number) => {
    const newState = update(this.state, {
      post: {
        $merge: {
          likes,
        }
      }
    })

    this.setState(newState)
  }

  triggerLikeSuccess = async () => {
    this.setState({ activeLike: true })

    const promise = new Promise((resolve) => window.setTimeout(() => {
      this.setState({ activeLike: false })

      return resolve()
    }, 300))

    return promise
  }

  /**
   * Convert markdown string to html string
   * @param content - markdown string
   * @returns html string
   */
  convertMarkdownContent = (content: string) => marked(content)

  /**
   * Render post
   * @param postData - post JSON data
   * @returns JSX Elements
   */
  renderPost(postData: BlogTypes.Post) {
    const renderMarkedContent = () => (
      <div
        className={`${PREFIX_CLASS}__content markdown`}
        dangerouslySetInnerHTML={{
          __html: this.convertMarkdownContent(postData.content)
        }}
      />
    )

    const renderTags = () => (
      <div className={`${PREFIX_CLASS}__tags`}>
        {
          postData.tags.map(tag => 
            <a key={tag} className={`${PREFIX_CLASS}__tag`}>{tag}</a>
          )
        }
      </div>
    )

    const renderBottomInfo = () => (
      <div className={`${PREFIX_CLASS}__bottom-info`}>
        <div className={`${PREFIX_CLASS}__publish-time`}>发布于{convertTimeFormat(postData.publishAt)}</div>
        <div className={`${PREFIX_CLASS}__actions`}>
          <div
            className={classNames(
              `${PREFIX_CLASS}__likes-summary`,
              {
                [`${PREFIX_CLASS}__action--active`]: this.state.activeLike,
              },
            )}
            onClick={() => this.handleClickLike()}
          >
            <div className={`${PREFIX_CLASS}__action-icon`}>
              <Icon name="like-simple" />
            </div>
            <div className={`${PREFIX_CLASS}__action-count`}>
              {postData.likes}
            </div>
          </div>
          <div className={`${PREFIX_CLASS}__comments-summary`}>
            <div className={`${PREFIX_CLASS}__action-icon`}>
              <Icon name="comment" />
            </div>
            <div className={`${PREFIX_CLASS}__action-count`}>
              {postData.comments}
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <React.Fragment>
        <div className={`${PREFIX_CLASS}__title`}>{postData.title}</div>
        <div className={`${PREFIX_CLASS}__category`}>{postData.category}</div>
        {renderMarkedContent()}
        {renderTags()}
        {renderBottomInfo()}
        <Divider />
      </React.Fragment>
    )
  }

  render() {
    const { post, isLoading } = this.state

    return (
      <div className={PREFIX_CLASS}>
        {
          isLoading
            ? 'Loading...'
            : post ? this.renderPost(post) : null
        }
      </div>
    )
  }
}

export default PostDetail
