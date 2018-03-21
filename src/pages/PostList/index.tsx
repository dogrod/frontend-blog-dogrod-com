import * as React from 'react'
import { AxiosResponse } from 'axios'
// import { Link } from 'react-router-dom'

import http from 'services/http/http'

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

  async componentDidMount() {
    try {
      const response: AxiosResponse<IResponse.PostListResponse>
        = await http.get('/blog/posts')
  
      this.setState({
        list: response.data.result.posts,
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
      const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' }).toLocaleUpperCase()
      const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

      return (
        <ListItem
          key={post.id}
          title={post.title.toUpperCase()}
          publishTime={displayPublishTime}
          url={`/post/${post.slug}`}
          summary={post.content}
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
}

export default PostList
