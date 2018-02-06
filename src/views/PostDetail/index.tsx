import * as React from 'react'
import { RouteComponentProps } from 'react-router'
interface DetailRouterProps {
  id: number
}

interface DetailProps extends RouteComponentProps<DetailRouterProps> {}

class PostDetail extends React.Component<DetailProps> {
  constructor(props: DetailProps) {
    super(props)
  }

  render() {
    return (
      <div>Post ID is: {this.props.match.params.id}</div>
    )
  }
}

export default PostDetail