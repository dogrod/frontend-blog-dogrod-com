import * as React from 'react'

import './loading.scss'

interface PropTypes {
  error?: boolean
}

const PREFIX_CLASS = 'loading'

const Loading: React.SFC<PropTypes> = (props) => {
  const renderLoadingContent = () => (
    <div className={PREFIX_CLASS}>
      {props.error
        ? '出错啦 (⇀‸↼‶)'
        : props.children || '正在努力加载中 ((⃘ ̂͘₎o̮₍ ̂͘ )⃘)'
      }
    </div>
  )
  
  return (
    <div className={`${PREFIX_CLASS}__wrapper`}>
      {renderLoadingContent()}
    </div>
  )
}

export default Loading
