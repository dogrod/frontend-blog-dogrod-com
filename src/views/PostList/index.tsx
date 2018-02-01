import * as React from 'react'
import { AxiosResponse } from 'axios'
import http from 'services/http/http'

import { IResponse } from 'types/api'
import { IBlog } from 'types/blog'

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
      const displayPublishTime = `${publishTime.getFullYear()}-${publishTime.getMonth() + 1}-${publishTime.getDate()}`
      
      const tagsLength = post.tags.length
      const renderTags = post.tags.map((tag, index) => {
        return (
          <span key={tag.slug}>{tag.name}{index !== tagsLength - 1 ? ', ' : null}</span>
        )
      })

      const renderTagsBlock = () => {
        return tagsLength ? (<div>tags: {renderTags}</div>) : null
      }

      return (
        <li key={post.id}>
          <div>{displayPublishTime}</div>
          <div>{post.title}</div>
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
