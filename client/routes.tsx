import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

import Header from '@/components/header'

import DynamicLoad from '@/services/dynamic-load'

const Routes: React.SFC<RouteComponentProps<{}>> = (props) => (
  <React.Fragment>
    <Header />
    <div className="content">
      <Route
        exact={true}
        key="post-list"
        path={props.match.path}
        component={DynamicLoad(() => import('@/pages/post/list'))}
      />
      <Route
        key="post-detail"
        path={`${props.match.path}post/:slug`}
        component={DynamicLoad(() => import('@/pages/post/detail'))}
      />
      <Route
        key="tag"
        path={`${props.match.path}tags/:tagName`}
        component={DynamicLoad(() => import('@/pages/post/list'))}
      />
      <Route
        key="tags"
        path={`${props.match.path}tags`}
        component={DynamicLoad(() => import('@/pages/tag'))}
      />
    </div>
  </React.Fragment>
)

export default Routes