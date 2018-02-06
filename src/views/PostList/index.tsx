import * as React from 'react'
import { AxiosResponse } from 'axios'
import { Link } from 'react-router-dom'

import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

import './index.css'

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
      const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' });
      const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`
      
      const tagsLength = post.tags.length
      const renderTags = post.tags.map((tag, index) => {
        return (
          <span key={tag.slug}>
            <a className="post-list__tag">{tag.name}</a>
            {index !== tagsLength - 1 ? ', ' : null}
          </span>
        )
      })

      const renderTagsBlock = () => {
        return tagsLength ? (
          <div className="post-list__tags">tag{tagsLength > 1 ? 's' : null}: {renderTags}</div>
        ) : null
      }

      return (
        <li key={post.id}>
          <div className="post-list__publish-time">{displayPublishTime}</div>
          <div className="post-list__title">
            <h2>
              <Link to={`/posts/${post.slug}`}>
                {post.title.toUpperCase()}
              </Link>
            </h2>
          </div>
          {renderTagsBlock()}
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
