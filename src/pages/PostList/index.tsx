import * as React from 'react'
import { AxiosResponse } from 'axios'
import * as marked from 'marked'

import http from 'services/http/http'
import setTitle from 'utils/set-title'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import List from 'components/List'
import ListItem from 'components/List/list-item.tsx'

import './index.scss'

export interface PostListStates {
  list: IBlog.Post[],
  isLoading: boolean
}

class PostList extends React.Component {
  state: PostListStates

  constructor(props: {}) {
    super(props)

    this.state = {
      list: [],
      isLoading: true
    }
  }

  async componentWillMount() {
    setTitle()

    try {
      const list = await this.fetchListData()
  
      this.setState({
        list: list,
        isLoading: false
      })
    } catch (error) {
      console.error(error)

      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const {
      list,
      isLoading,
    } = this.state
    
    if (isLoading) return 'Loading...'

    const renderList = list.map((post) => {
      const publishTime = new Date(post.publish_at)
      const publishDate = publishTime.toLocaleString('zh-cn', {
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Shanghai',
      }).toLocaleUpperCase()
      const displayPublishTime = `${publishDate}`

      return (
        <ListItem
          key={post.id}
          title={post.title.toUpperCase()}
          publishTime={displayPublishTime}
          url={`/post/${post.slug}`}
          summary={marked(post.content)}
        />
      )
    })

    return (
      <div className="post-list">
        <List>
          {renderList}
        </List>
      </div>
    )
  }

  private async fetchListData() {
    try {
      const response: AxiosResponse<IResponse.PostListResponse>
        = await http.get('/blog/posts')
      
      return response.data.result.posts
    } catch (error) {
      throw error
    }
  }
}

export default PostList
