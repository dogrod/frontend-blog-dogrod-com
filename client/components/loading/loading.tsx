import * as React from 'react'

import Card from '@/components/card'

import './loading.scss'

interface PropTypes {
  error?: boolean
  // Follow document flow
  follow?: boolean
}

const PREFIX_CLASS = 'loading'

const Loading: React.SFC<PropTypes> = (props) => {
  const renderLoadingContent = () => (
    <div className={PREFIX_CLASS}>
      <Card>
        {props.error
          ? '出错啦 (⇀‸↼‶)'
          : props.children || '正在努力加载中.. (⃘ ̂͘₎o̮₍ ̂͘ )⃘'
        }
      </Card>
    </div>
  )
  
  return (
    props.follow ? renderLoadingContent() : (
      <div className={`${PREFIX_CLASS}__wrapper`}>
        {renderLoadingContent()}
      </div>
    )
  )
}

export default Loading
