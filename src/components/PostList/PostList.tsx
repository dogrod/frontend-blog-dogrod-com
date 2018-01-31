import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import { IResponse } from '../../../types/api';

class PostList extends React.Component {
  constructor(props: {}) {
    super(props)

    this.state = {
      list: []
    }
  }

  async componentDidMount() {
    try {
      const response: AxiosResponse<IResponse.PostList> = await axios.get('//api.dev.dogrod.xyz/blog/posts')
  
      this.setState({
        list: response.data.results
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>Post List</div>
    )
  }
}

export default PostList
