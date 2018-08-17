import * as React from 'react'
import classNames from 'classnames'
import { RouteComponentProps } from 'react-router'
import Immutable from 'immutable'
import { Motion, spring, presets } from 'react-motion'

import Icon from '@/components/icon'
import Card from '@/components/card'
import Loading from '@/components/loading'

import api from '@/api'
import http from '@/utils/http'
import marked from '@/utils/marked'
import { convertTimeFormat, setTitle } from '@/utils'

import './index.scss'

declare module 'react' {
  interface SVGAttributes<T> {
    ['xlink:href']?: string
  }
}

type PostType = Immutable.Map<string, any>

interface PropTypes extends RouteComponentProps<{ slug: string }> {}

interface StateTypes {
  post?: PostType
  slug: string
  isLoading: boolean
  disableLike: boolean
  activeLike: boolean
  successLike: boolean
}

const PREFIX_CLASS = 'post-detail'
const CACHE_KEY = 'DRCacheSuccessLike'

class PostDetail extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      slug: props.match.params.slug,
      isLoading: false,
      disableLike: false,
      activeLike: false,
      successLike: false,
    }
  }

  async componentDidMount() {
    this.setLoadingStatus(true)

    try {
      const post = await this.fetchPostDetailData()

      setTitle(post.title)

      this.setState({
        post: Immutable.Map(post)
      })

      const localCache = window.localStorage.getItem(CACHE_KEY)
      if (localCache) {
        const cacheObject = JSON.parse(localCache)
        this.setSuccessLike(cacheObject[this.state.slug] === '1')
      }
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

      this.setSuccessLike(true)
      this.cacheSuccessLikeStatus(slug)
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
   * @param likes - likes of post
   */
  setLikeCount = (likes: number) => {
    if (!this.state.post) {
      return
    }

    const newState = {
      post: this.state.post.set('likes', likes)
    }

    this.setState(newState)
  }

  /**
   * Set success like
   * @param successLike - success like status
   */
  setSuccessLike = (successLike: boolean) => {
    this.setState({ successLike })
  }

  /**
   * Trigger like success status after like action succeed
   */
  triggerLikeSuccess = async () => {
    this.setState({
      activeLike: true,
    })

    const promise = new Promise((resolve) => window.setTimeout(
      () => {
        this.setState({ activeLike: false })

        return resolve()
      },
      300
    ))

    return promise
  }

  /**
   * Cache success like status in local storage
   * @param slug - post slug
   */
  cacheSuccessLikeStatus = (slug: string) => {
    const cacheObjectString = window.localStorage.getItem(CACHE_KEY)
    const cacheObject = cacheObjectString ? JSON.parse(cacheObjectString) : {}

    const newCacheObject =  {...cacheObject, ...{ [slug]: '1' }}
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(newCacheObject))
  }

  /**
   * Convert markdown string to html string
   * @param content - markdown string
   * @returns html string
   */
  convertMarkdownContent = (content: string) => marked(content)
  
  /**
   * get default style for transition motion
   */
  getDefaultStyles() {
    return {
      translateX: 50,
      opacity: 1,
    }
  }

  /**
   * get style
   */
  getStyles() {
    return {
      translateX: spring(0, presets.gentle),
      opacity: spring(1, presets.gentle),
    }
  }

  /**
   * Render post
   * @param postData - post Map
   * @returns JSX Elements
   */
  renderPost(postData: PostType) {
    const { getDefaultStyles, getStyles } = this

    const renderMarkedContent = () => (
      <div
        className={`${PREFIX_CLASS}__content markdown`}
        dangerouslySetInnerHTML={{
          __html: this.convertMarkdownContent(postData.get('content') || '')
        }}
      />
    )

    const renderTags = () => (
      <div className={`${PREFIX_CLASS}__tags`}>
        {
          postData.get('tags').map((tag: string) => 
            <a key={tag} className={`${PREFIX_CLASS}__tag`}>{tag}</a>
          )
        }
      </div>
    )

    const renderBottomInfo = () => (
      <div className={`${PREFIX_CLASS}__bottom-info`}>
        <div className={`${PREFIX_CLASS}__publish-time`}>发布于{convertTimeFormat(postData.get('publishAt'))}</div>
        <div className={`${PREFIX_CLASS}__actions`}>
          <div
            className={classNames(
              `${PREFIX_CLASS}__likes-summary`,
              {
                [`${PREFIX_CLASS}__action--active`]: this.state.activeLike,
                [`${PREFIX_CLASS}__action--highlight`]: this.state.successLike,
              },
            )}
            onClick={() => this.handleClickLike()}
          >
            <div className={`${PREFIX_CLASS}__action-icon`}>
              <Icon name="like-simple" />
            </div>
            <div className={`${PREFIX_CLASS}__action-count`}>
              {postData.get('likes')}
            </div>
          </div>
          <div className={`${PREFIX_CLASS}__comments-summary`}>
            <div className={`${PREFIX_CLASS}__action-icon`}>
              <Icon name="comment" />
            </div>
            <div className={`${PREFIX_CLASS}__action-count`}>
              {postData.get('comments')}
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <Motion
        defaultStyle={getDefaultStyles()}
        style={getStyles()}
      >
        {style => 
          <Card
            style={{
              opacity: style.opacity,
              WebkitTransform: `translate(${style.translateX}px, 0)`,
              transform: `translate(${style.translateX}px, 0)`,
            }}
          >
            <div className={PREFIX_CLASS}>
              <h1 className={`${PREFIX_CLASS}__title`}>{postData.get('title')}</h1>
              <div className={`${PREFIX_CLASS}__category`}>{postData.get('category')}</div>
              {renderMarkedContent()}
              {renderTags()}
              {renderBottomInfo()}
            </div>
          </Card>
        }
      </Motion>
    )
  }

  render() {
    const { post, isLoading } = this.state
    
    return (
      <div className={`${PREFIX_CLASS}__wrapper`}>
        {isLoading
          ? <Loading />
          : post ? this.renderPost(post) : null
        }
      </div>
    )
  }
}

export default PostDetail
