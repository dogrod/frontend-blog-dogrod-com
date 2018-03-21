import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { IBlog } from 'types/blog';
import { AxiosResponse } from 'axios'

import $http from 'services/http/http'
import { IResponse } from 'types/api'

import List from 'components/List'
import ListItem from 'components/List/list-item.tsx'

import './index.scss'

interface RouteProps {
  tagName: string
}

interface Props extends RouteComponentProps<RouteProps> {}

interface State {
  tag: string
  posts: IBlog.Post[]
  isLoading: boolean
}

export default class PostsWithTag extends React.Component<Props> {
  state: State

  constructor(props: Props) {
    super(props)

    this.state = {
      tag: props.match.params.tagName,
      posts: [],
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
      posts,
      tag
    } = this.state

    const renderList = posts.map((post) => {
      const publishTime = new Date(post.publish_at)
      const publishMonth = publishTime.toLocaleString('en-us', { month: 'short' }).toLocaleUpperCase()
      const displayPublishTime = `${publishMonth} ${publishTime.getDate()}, ${publishTime.getFullYear()}`

      return (
        <ListItem
          key={post.id}
          title={post.title.toLocaleUpperCase()}
          publishTime={displayPublishTime}
          url={`/post/${post.slug}`}
          summary={post.content}
        />
      )
    })

    const renderContent = () => {
      return posts && posts.length
        ?  (
          <React.Fragment>
            <div className="tag-title">标签包含“{tag}”的文章</div>
            <List>{renderList}</List>
          </React.Fragment>
        ) : `No post with tag ${tag}.`
    }

    return (
      <div>{renderContent()}</div>
    )
  }

  private async fetchPosts() {
    try {
      const response: AxiosResponse<IResponse.PostListResponse>
        = await $http.get(`/blog/tag/${this.state.tag}`)

      return this.setState({
        posts: response.data.result.posts
      })
    } catch (error) {
      return console.error(error)
    }
  }
}