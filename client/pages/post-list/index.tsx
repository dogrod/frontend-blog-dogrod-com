import * as React from 'react'
// import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

// import { PostListResponse } from '@/types/api'
import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'
import { convertTimeFormat } from '@/utils'

import List from '@/components/list'
import ListItem from '@/components/list/item'

import './index.scss'

interface StateTypes {
  list: BlogTypes.Post[],
  isLoading: Boolean,
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

  async fetchPostListData() {
    const url = api.getPosts
    
    try {
      // FIXME: Fix conflict between axios response & axios response interceptors
      const response: any = await http.get(url)

      return response.result.posts
    } catch (error) {
      throw error
    }
  }

  setLoadingStatus(isLoading: boolean) {
    this.setState({ isLoading })
  }

  render() {
    const { state } = this
    const { list, isLoading } = state

    const renderList = () => {
      return list.map((item) => {
        const url = `/post/${item.slug}`

        return (
          <ListItem key={item.id}>
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
          </ListItem>
        )
      })
    }

    return (
      <div className={PREFIX_CLASS}>
        {
          isLoading
            ? 'Loading...'
            : (
              <List>
                {renderList()}
              </List>
            )
        }
      </div>
    )
  }
}

export default PostList
