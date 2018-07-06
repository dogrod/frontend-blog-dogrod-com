import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'

import PostList from './pages/post-list'
import PostDetail from './pages/post-detail'
import Tag from './pages/tag'

export default [
  <Route exact key="post-list" path="/" component={PostList} />,
  <Route key="post-detail" path="/post/:slug" component={PostDetail} />,
  <Route key="tag" path="/tags/:tagName" component={PostList} />,
  <Route key="tags" path="/tags" component={Tag} />,
  <Redirect key="not-found" to="/" />
]