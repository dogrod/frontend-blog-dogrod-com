import * as React from 'react'
import { AxiosResponse } from 'axios'
import http from 'services/http/http'

import { IResponse } from '../../../types/api'
import { IBlog } from '../../../types/blog'

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
      return (
        <li key={post.id}>
          <div>{post.publish_at}</div>
          <div>{post.title}</div>
          <div>tags</div>
        </li>
      )
    })

    return (
      <div>
        <ul>
          {renderList}
        </ul>
      </div>
    )
  }
}

export default PostList
