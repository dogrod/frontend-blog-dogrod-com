import React, { Component } from 'react'
import axios from 'axios'

class Index extends Component {
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/posts')

    axios.get('http://127.0.0.1:8000/api/post/1')
  }

  render() {
    return (
      <div>index page</div>
    )
  }
}

export default Index