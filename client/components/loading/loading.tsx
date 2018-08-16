import * as React from 'react'
import { createPortal } from 'react-dom'

import './loading.scss'

const PREFIX_CLASS = 'loading'

class Loading extends React.Component {
  render() {
    const renderLoadingContent = () => (
      <div className={PREFIX_CLASS}>
        {this.props.children || '正在努力加载中 ((⃘ ̂͘₎o̮₍ ̂͘ )⃘)'}
      </div>
    )
    
    return createPortal(
      (
        <div className={`${PREFIX_CLASS}__wrapper`} id="loading">
          {renderLoadingContent()}
        </div>
      ),
      document.body,
    )
  }
}

export default Loading
