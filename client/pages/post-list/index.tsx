import * as React from 'react'
// import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

// import { PostListResponse } from '@/types/api'
import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'
import { convertTimeFormat, setTitle } from '@/utils'

import List from '@/components/list'
import ListItem from '@/components/list/item'
import Card from '@/components/card'

import './index.scss'

interface StateTypes {
  list: BlogTypes.Post[],
  isLoading: boolean,
}

const PREFIX_CLASS = 'post-list'

class PostList extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      list: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    setTitle('无敌筋斗雷 x 不唠嗑')
    // Start loading status
    this.setLoadingStatus(true)

    try {
      const list = await this.fetchPostListData()

      this.setState({
        list
      })
    } catch (error) {
      console.error(error)
    } finally {
      // End loading status
      this.setLoadingStatus(false)
    }
  }

  /**
   * fetch post list data
   * @returns promise instance
   */
  fetchPostListData = async () => {
    const url = api.getPosts
    
    try {
      // FIXME: Fix conflict between axios response & axios response interceptors
      const response: any = await http.get(url)

      return response.posts
    } catch (error) {
      throw error
    }
  }

  /**
   * set loading status
   * @param isLoading - loading status
   */
  setLoadingStatus(isLoading: boolean) {
    this.setState({ isLoading })
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
        <div className={`${PREFIX_CLASS}__content`}>
          <div className={`${PREFIX_CLASS}__title`}>
            <Link to={url}>
              {item.title}
            </Link>
          </div>
          <div className={`${PREFIX_CLASS}__summary`}>
            <div dangerouslySetInnerHTML={{__html: item.content}} />
            <span className={`${PREFIX_CLASS}__summary__view`}>
              <Link to={url}>
                查看全文
              </Link>
            </span>
          </div>
        </div>
      </div>
    )
  }

  /**
   * render post list
   * @param list - post list data
   */
  renderList = (list: BlogTypes.Post[]) => {
    const { renderPostContent } = this
    return list.map((item) => {
      return (
        <ListItem key={item.id}>
          <Card>
            {renderPostContent(item)}
          </Card>
        </ListItem>
      )
    })
  }

  render() {
    const { state } = this
    const { list, isLoading } = state

    return (
      <div className={PREFIX_CLASS}>
        {
          isLoading
            ? 'Loading...'
            : (
              <List>
                {this.renderList(list)}
              </List>
            )
        }
      </div>
    )
  }
}

export default PostList
