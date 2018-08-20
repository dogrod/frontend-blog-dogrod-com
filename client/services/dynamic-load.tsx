import React from 'react'

import Loadable from 'react-loadable'

type LoaderType = any

const Loading: React.SFC<Loadable.LoadingComponentProps> = props => {
  if (props.error) {
    return <div>加载发生错误 (´・Å・`)<button onClick={props.retry}>点击重试</button></div>
  } else if (props.timedOut) {
    return <div>加载时间过长 (|||ﾟдﾟ) <button onClick={props.retry}>点击重试</button></div>
  } else if (props.pastDelay) {
    return <div>在正努力加载中 d(`･∀･)b</div>
  } else {
    return null
  }
}

const LoadableComponent = (loader: LoaderType) => Loadable({
  loader,
  loading: Loading,
  // Delay time before loading.props.pastDelay
  delay: 500,
  // Time before passing timeOut to loading component
  timeout: 5000,
})

export default LoadableComponent
