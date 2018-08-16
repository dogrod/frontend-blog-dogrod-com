import React from 'react'

import Loadable from 'react-loadable'

type LoaderType = any

const Loading: React.SFC<Loadable.LoadingComponentProps> = props => {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
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
  timeout: 2000,
})

export default LoadableComponent
