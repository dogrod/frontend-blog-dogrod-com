import * as React from 'react'
import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import './index.scss'

export interface PostListStates {
  list: IBlog.Post[]
}

class PostList extends React.Component {
  state: PostListStates

  constructor(props: {}) {
    super(props)

    this.state = {
      list: []
    }
  }

  async componentDidMount() {
    try {
      const response: AxiosResponse<IResponse.PostList>
        = await http.get('/blog/posts')
  
      this.setState({
        list: response.data.results
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { list } = this.state
    
    const renderList = list.map((post) => {
      const publishTime = new Date(post.publish_at)
      const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' }).toLocaleUpperCase()
      const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

      return (
        <li key={post.id}>
          <div className="post-list__publish-time">{displayPublishTime}</div>
          <div className="post-list__title">
            <Link to={`/posts/${post.slug}`}>
              {post.title.toUpperCase()}
            </Link>
          </div>
        </li>
      )
    })

    return (
      <div className="post-list">
        <ul>
          {renderList}
        </ul>
      </div>
    )
  }
}

export default PostList
