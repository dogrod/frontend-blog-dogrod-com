import * as React from 'react'
import { RouteComponentProps } from 'react-router'
interface DetailRouterProps {
  slug: string
}

interface DetailProps extends RouteComponentProps<DetailRouterProps> {}

class PostDetail extends React.Component<DetailProps> {
  constructor(props: DetailProps) {
    super(props)
  }

  render() {
    return (
      <div>Post slug is: {this.props.match.params.slug}</div>
    )
  }
}

export default PostDetail