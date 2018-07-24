import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

import NavBar from '@/components/nav-bar'
import PostList from './pages/post-list'
import PostDetail from './pages/post-detail'
import Tag from './pages/tag'

const Routes: React.SFC<RouteComponentProps<{}>> = (props) => (
  <React.Fragment>
    <NavBar />
    <div className="content">
    <Route exact key="post-list" path={props.match.path} component={PostList} />,
    <Route key="post-detail" path={`${props.match.path}post/:slug`} component={PostDetail} />
    <Route key="tag" path={`${props.match.path}tags/:tagName`} component={PostList} />
    <Route key="tags" path={`${props.match.path}tags`} component={Tag} />
    </div>
  </React.Fragment>
)

export default Routes