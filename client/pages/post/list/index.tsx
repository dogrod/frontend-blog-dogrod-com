import * as React from 'react'
// import { AxiosResponse } from 'axios'
import { Link, RouteComponentProps } from 'react-router-dom'
import { TransitionMotion, spring, presets, TransitionPlainStyle } from 'react-motion'
import omit from 'omit.js'
import Immutable from 'immutable'
import qs from 'query-string'

// import { PostListResponse } from '@/types/api'
import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'
import { convertTimeFormat, setTitle, throttle } from '@/utils'
import { REG_EXTRACT_ID_FROM_MIXED_SLUG } from '@/utils/regs'

import List from '@/components/list'
import ListItem from '@/components/list/item'
import Card from '@/components/card'
import Loading from '@/components/loading'
import Toast from '@/components/toast'
import AnimatedCard from '../_components/animated-card'

import './index.scss'

interface PropTypes extends RouteComponentProps<{}> {}

interface StateTypes {
  list: Immutable.List<BlogTypes.Post>,
  isLoading: boolean,
  page: number
  pageSize: number
  tag: string | null
  tagId: string | null
  loadable: boolean
}

const PREFIX_CLASS = 'post-list'

class PostList extends React.Component<PropTypes, StateTypes> {
  clientWidth: number

  constructor(props: PropTypes) {
    super(props)

    let tag = null

    const search = this.props.location.search
    const query = qs.parse(search)
    const tagQuery: string = query.tag || ''
    const matchedArray = tagQuery.match(REG_EXTRACT_ID_FROM_MIXED_SLUG)
    const tagId = matchedArray ? matchedArray[0] : null
    
    if (tagId) {
      const endPoint = tagQuery.length - tagId.length - 1
      tag = tagQuery.substring(0, endPoint)
    }

    this.state = {
      list: Immutable.List([]),
      isLoading: false,
      page: 0,
      pageSize: 15,
      tag,
      tagId,
      loadable: true,
    }
  }

  componentDidMount() {
    setTitle('无敌筋斗雷 x 不唠嗑')

    this.clientWidth = window.innerWidth
    
    this.fetchPostList()

    window.addEventListener(
      'scroll',
      this.handleScroll,
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.handleScroll,
    )
  }

  handleScroll = () => {
    const isReachedBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50
  
    if (isReachedBottom) {
      throttle(
        () => {
            this.fetchPostList()
            console.log(`you're at the bottom of the page`)
        },
        1000
      )
    }
  }

  /**
   * click post item event, only work when client width is smaller than 650 pixels
   * @param url - url of post detail
   */
  handleClickPostItem = (url: string) => {
    if (this.clientWidth > 650) {
      return
    }

    this.props.history.push(url)
  }

  /**
   * fetch post list data
   * @returns promise instance
   */
  fetchPostList = async () => {
    const { page, pageSize, tagId, loadable, isLoading } = this.state

    if (isLoading || !loadable) {
      return
    }
    
    const url = api.getPosts
    const params = {
      page: page + 1,
      pageSize,
      tag: tagId,
    }

    // Start loading status
    this.setLoadingStatus(true)
    
    try {
      // FIXME: Fix conflict between axios response & axios response interceptors
      const response: any = await http.get(url, { params })

      const list = response.list

      if (response.pageCount <= response.page) {
        this.setLoadable(false)
      }

      this.mergePostList(list)
      this.setPageNumber(response.page)
    } catch (error) {
      Toast.show(error.message)
    } finally {
      // End loading status
      this.setLoadingStatus(false)
    }
  }

  /**
   * Set loadable field
   * @param loadable - can load more
   */
  setLoadable = (loadable: boolean) => {
    this.setState({ loadable })
  }

  /**
   * set loading status
   * @param isLoading - loading status
   */
  setLoadingStatus = (isLoading: boolean) => {
    this.setState({ isLoading })
  }

  /**
   * set page number
   * @param page - page number
   */
  setPageNumber = (page: number) => {
    this.setState({ page })
  }

  /**
   * Merge new item to post list
   * @param newList - new post items
   */
  mergePostList = (newList: BlogTypes.Post[]) => {
    const newState = {
      list: this.state.list.merge(newList)
    }

    this.setState(newState)
  }

  /**
   * get default style for transition motion
   */
  getDefaultStyles = () => {
    return this.state.list.map(post => ({
      key: post.slug,
      data: post,
      style: {
        translateX: 50,
        opacity: 1,
      },
    })).toArray()
  }

  /**
   * get style
   */
  getStyles = () => {
    return this.state.list.map(post => {
      return {
        key: post.slug,
        data: post,
        style: {
          translateX: spring(0, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    }).toArray()
  }

  /**
   * before enter
   */
  willEnter() {
    return {
      translateX: 50,
      opacity: 0,
    }
  }

  /**
   * before leave
   */
  willLeave() {
    return {
      translateX: spring(50, presets.gentle),
      opacity: spring(0),
    }
  }

  /**
   * Render tag panel
   */
  renderTagPanel = () => {
    const { tag } = this.state

    return tag ? (
      <AnimatedCard className={`${PREFIX_CLASS}__tag-panel`}>
        标签包含“{tag}”的文章
      </AnimatedCard>
    ) : null
  }

  /**
   * render post content inside <Card></Card>
   * @param item - post item
   */
  renderPostContent = (item: BlogTypes.Post) => {
    const { handleClickPostItem } = this
    const url = `/posts/${item.slug}-${item.id}`

    return (
      <Card className={`${PREFIX_CLASS}__item`} onClick={() => handleClickPostItem(url)}>
        <div className={`${PREFIX_CLASS}__cover-image`}>
          <img src={`${item.coverImage}!/fh/300`} />
        </div>
        <div className={`${PREFIX_CLASS}__description`}>
          <div className={`${PREFIX_CLASS}__title`}>
            <Link to={url}>
              {item.title}
            </Link>
          </div>
          <p className={`${PREFIX_CLASS}__category`}>
            {item.category.title}
          </p>
          <p
            className={`${PREFIX_CLASS}__content`}
            dangerouslySetInnerHTML={{__html: item.content}}
          />
          <p className={`${PREFIX_CLASS}__read-more`}>
            <a className={`${PREFIX_CLASS}__publish-time`}>
              发布于{convertTimeFormat(item.publishAt)}
            </a>
            <Link to={url}>
              查看全文
            </Link>
          </p>
        </div>
      </Card>
    )
  }

  /**
   * render motion styled item
   * @param item - item data
   */
  renderStyledItem = (item: TransitionPlainStyle) => {
    const { renderPostContent } = this
    const post: BlogTypes.Post = item.data
    const { style } = item

    return (
      <ListItem
        key={post.id}
        style={{
          ...omit(style, ['translateX']),
          WebkitTransform: `translate(${style.translateX}px, 0)`,
          transform: `translate(${style.translateX}px, 0)`,
          marginBottom: '30px',
        }}
      >
        {renderPostContent(post)}
      </ListItem>
    )
  }

  render() {
    const {
      state,
      getDefaultStyles,
      getStyles,
      willEnter,
      willLeave,
      renderTagPanel,
      renderStyledItem,
    } = this
    const { isLoading } = state

    return (
      <div className={PREFIX_CLASS}>
        {renderTagPanel()}
        <TransitionMotion
          defaultStyles={getDefaultStyles()}
          styles={getStyles()}
          willEnter={willEnter}
          willLeave={willLeave}
        >
        {styles => (
          <List>
            {styles.map((item) => renderStyledItem(item))}
          </List>
        )}
        </TransitionMotion>
        {
          isLoading
            ? <Loading />
            : null
        }
      </div>
    )
  }
}

export default PostList
