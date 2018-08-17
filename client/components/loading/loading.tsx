import * as React from 'react'
import { createPortal } from 'react-dom'
import { Motion, spring, presets } from 'react-motion'

import './loading.scss'

const PREFIX_CLASS = 'loading'

class Loading extends React.Component {
  getDefaultStyles() {
    return {
      opacity: 0,
    }
  }

  getStyles() {
    return {
      opacity: spring(1, presets.gentle),
    }
  }

  render() {
    const { getDefaultStyles, getStyles } = this
  
    const renderLoadingContent = () => (
      <Motion
        defaultStyle={getDefaultStyles()}
        style={getStyles()}
      >
        {style => 
          <div className={PREFIX_CLASS} style={{...style}}>
            {this.props.children || '正在努力加载中 ((⃘ ̂͘₎o̮₍ ̂͘ )⃘)'}
          </div>
        }
      </Motion>
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
