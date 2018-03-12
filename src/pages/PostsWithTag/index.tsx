import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { IBlog } from 'types/blog';
import { AxiosResponse } from 'axios'

import $http from 'services/http/http'
import { IResponse } from 'types/api';

interface RouteProps {
  slug: string
}

interface Props extends RouteComponentProps<RouteProps> {}

interface State {
  slug: string
  posts?: IBlog.Post[]
  isLoading: boolean
}

export default class PostsWithTag extends React.Component<Props> {
  state: State

  constructor(props: Props) {
    super(props)

    this.state = {
      slug: props.match.params.slug,
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.fetchPosts()

    this.setState({
      isLoading: false
    })
  }

  render() {
    const {
      posts
    } = this.state

    const renderPosts = () => {
      return posts && posts.length
        ? posts.map((post) => (<li>{post.title}</li>)) : 'No post with this tag.'
    }

    return (
      <div>{renderPosts()}</div>
    )
  }

  private async fetchPosts() {
    try {
      const response: AxiosResponse<IResponse.PostList>
        = await $http.get(`/blog/tags/${this.state.slug}`)

      return this.setState({
        posts: response.data.results
      })
    } catch (error) {
      return console.error(error)
    }
  }
}