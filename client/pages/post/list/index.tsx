import * as React from 'react'
// import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'
import { TransitionMotion, spring, presets, TransitionPlainStyle } from 'react-motion'
import omit from 'omit.js'
import update from 'immutability-helper'

// import { PostListResponse } from '@/types/api'
import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'
import { convertTimeFormat, setTitle } from '@/utils'

import List from '@/components/list'
import ListItem from '@/components/list/item'
import Card from '@/components/card'
import Loading from '@/components/loading'

import './index.scss'

interface StateTypes {
  list: BlogTypes.Post[],
  isLoading: boolean,
  page: number
  pageSize: number
  tag: string | null
  loadable: boolean
}

const PREFIX_CLASS = 'post-list'

class PostList extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      list: [],
      isLoading: false,
      page: 0,
      pageSize: 15,
      tag: null,
      loadable: true,
    }
  }

  componentDidMount() {
    setTitle('无敌筋斗雷 x 不唠嗑')
    
    this.fetchPostList()
  }

  /**
   * fetch post list data
   * @returns promise instance
   */
  fetchPostList = async () => {
    const { page, pageSize, tag, loadable, isLoading } = this.state

    if (isLoading || !loadable) {
      return
    }
    
    const url = api.getPosts
    const params = {
      page: page + 1,
      pageSize,
      tag,
    }

    // Start loading status
    this.setLoadingStatus(true)
    
    try {
      // FIXME: Fix conflict between axios response & axios response interceptors
      const response: any = await http.get(url, { params })

      const list = response.posts
      this.pushPostList(list)
      this.setPageNumber(response.page)
    } catch (error) {
      console.error(error)
    } finally {
      // End loading status
      this.setLoadingStatus(false)
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
   * set page number
   * @param pageNumber - page number
   */
  setPageNumber = (pageNumber: number) => {
    const newState = update(this.state, {
      page: {
        $set: pageNumber,
      }
    })

    this.setState(newState)
  }

  /**
   * Push new item to post list
   * @param newList - new post items
   */
  pushPostList = (newList: BlogTypes.Post[]) => {
    const newState = update(this.state, {
      list: {
        $push: newList
      }
    })

    this.setState(newState)
  }

  /**
   * get default style for transition motion
   */
  getDefaultStyle = () => {
    return this.state.list.map(post => ({
      key: post.slug,
      data: post,
      style: {
        translateY: -100,
        opacity: 1,
      },
    }))
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
          translateY: spring(0, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    })
  }

  /**
   * before enter
   */
  willEnter() {
    return {
      translateY: -50,
      opacity: 0,
    }
  }

  /**
   * before leave
   */
  willLeave() {
    return {
      translateY: spring(-100,presets.gentle),
      opacity: spring(0),
    }
  }

  /**
   * render post content inside <Card></Card>
   * @param item - post item
   */
  renderPostContent = (item: BlogTypes.Post) => {
    const url = `/post/${item.slug}`

    return (
      <div className={`${PREFIX_CLASS}__item`}>
        <div className={`${PREFIX_CLASS}__publish-time`}>
          {convertTimeFormat(item.publishAt)}
        </div>
        <div className={`${PREFIX_CLASS}__description`}>
          <div className={`${PREFIX_CLASS}__title`}>
            <Link to={url}>
              {item.title}
            </Link>
          </div>
          <p
            className={`${PREFIX_CLASS}__content`}
            dangerouslySetInnerHTML={{__html: item.content}}
          />
          <p className={`${PREFIX_CLASS}__read-more`}>
            <Link to={url}>
              查看全文
            </Link>
          </p>
        </div>
      </div>
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
          ...omit(style, ['translateY', 'scaleY']),
          transform: `translate(0, ${style.translateY}px)`,
        }}
      >
        <Card>
          {renderPostContent(post)}
        </Card>
      </ListItem>
    )
  }

  render() {
    const {
      state,
      getDefaultStyle,
      getStyles,
      willEnter,
      willLeave,
      renderStyledItem,
    } = this
    const { isLoading } = state

    return (
      <div className={PREFIX_CLASS}>
        <TransitionMotion
          defaultStyles={getDefaultStyle()}
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
