import * as React from 'react'
// import { AxiosResponse } from 'axios'

// import { PostListResponse } from '@/types/api'
import BlogTypes from '@/types/blog'

import http from '@/utils/http'
import api from '@/api'

interface StateTypes {
  list: BlogTypes.Post[],
  isLoading: Boolean,
}

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
        list: list
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
      const response: any
        = await http.get(url)

      return response.result.posts
    } catch (error) {
      throw error
    }
  }

  setLoadingStatus(isLoading: boolean) {
    this.setState({ isLoading })
  }

  render() {
    const { list, isLoading } = this.state

    return (
      <div>
        {
          isLoading ? 'Loading...' : list.length
        }
      </div>
    )
  }
}

export default PostList
