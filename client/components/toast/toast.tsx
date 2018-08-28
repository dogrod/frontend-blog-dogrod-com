import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TransitionMotion, spring, presets, TransitionPlainStyle } from 'react-motion'
import omit from 'omit.js'

import './toast.scss'

const PREFIX_CLASS = 'toast'

interface ToastItem {
  key: string
  content: string
}

interface StateTypes {
  toasts: ToastItem[],
}

export interface ToastOptions {
  message: string
  duration?: number
  key?: string
}

export interface InstanceInterface {
  add: (options: ToastOptions) => void
  remove: (key: string) => void
}

let _index = 0
const timeStamp = Date.now()

const getUUID = () => `toast-${timeStamp}-${_index++}`

class Toast extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      toasts: [],
    }
  }

  add = (options: ToastOptions) => {
    const newItem = {
      key: options.key || getUUID(),
      content: options.message,
    }
    
    this.setState(prev => {
      const newQueue = prev.toasts.slice()
      newQueue.push(newItem)

      if (options.duration) {
        setTimeout(
          () => {
            this.remove(newItem.key)
          },
          options.duration
        )
      }

      return {
        toasts: newQueue
      }
    })
  }

  remove = (key: string) => {
    this.setState(prev => {
      return {
        toasts: prev.toasts.filter(toast => toast.key !== key)
      }
    })
  }

  getDefaultStyles = () => {
    return this.state.toasts.map(toast => {
      return {
        key: toast.key,
        data: toast,
        style: {
          translateX: 50,
          opacity: 1,
        }
      }
    })
  }

  getStyles = () => {
    return this.state.toasts.map(toast => {
      return {
        key: toast.key,
        data: toast,
        style: {
          translateX: spring(0, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      }
    })
  }

  willEnter() {
    return {
      translateX: 50,
      opacity: 0,
    }
  }

  willLeave() {
    return {
      translateX: spring(50, presets.gentle),
      opacity: spring(0),
    }
  }

  renderStyledItem = (config: TransitionPlainStyle) => {
    const { style, key, data } = config
    return (
      <div
        key={key}
        className={`${PREFIX_CLASS}__item`}
        style={{
          ...omit(style, ['translateX']),
          WebkitTransform: `translate(${style.translateX}px, 0)`,
          transform: `translate(${style.translateX}px, 0)`,
          marginBottom: '30px',
        }}
      >
        {data.content}
      </div>
    )
  }

  render() {
    const {
      getDefaultStyles,
      getStyles,
      willEnter,
      willLeave,
      renderStyledItem,
    } = this

    return (
      <div className={PREFIX_CLASS}>
        <TransitionMotion
          defaultStyles={getDefaultStyles()}
          styles={getStyles()}
          willEnter={willEnter}
          willLeave={willLeave}
        >
          {interpolatedStyles => (
            <div>
              {interpolatedStyles.map(config => renderStyledItem(config))}
            </div>
          )}
        </TransitionMotion>
      </div>
    )
  }
}

const createInstance = () => {
  const promise = new Promise<InstanceInterface>((resolve) => {
    const div = document.createElement('div')

    document.body.appendChild(div)

    const ref = (toast: any) => {
      return resolve({
        add: toast.add,
        remove: toast.remove,
      })
    }

    ReactDOM.render(<Toast ref={ref} />, div)
  })

  return promise
}

export default createInstance