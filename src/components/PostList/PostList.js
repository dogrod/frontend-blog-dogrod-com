import React, { Component } from 'react'
import axios from 'axios'

class PostList extends Component {
  componentDidMount() {
    axios.get('//api.dev.dogrod.xyz/blog/posts')

    // axios.get('http://127.0.0.1:8000/api/post/1')
  }

  render() {
    return (
      <div>Post List</div>
    )
  }
}

export default PostList