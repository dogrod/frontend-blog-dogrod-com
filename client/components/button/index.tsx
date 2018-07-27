import * as React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

interface PropState extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
}

export enum ButtonSize {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const PREFIX_CLASS = 'button'

class Button extends React.Component<PropState> {
  constructor(props: PropState) {
    super(props)
  }

  getClassName = () => {
    const { size } = this.props

    return classNames(
      PREFIX_CLASS,
      {
        [`${PREFIX_CLASS}--small`]: size === ButtonSize.SMALL,
        [`${PREFIX_CLASS}--large`]: size === ButtonSize.LARGE,
      },
      this.props.className,
    )
  }

  getNativeAttributes = () => omit(this.props, ['size', 'className', 'children'])

  renderButton = () => {
    return (<button {...this.getNativeAttributes()}>{this.props.children}</button>)
  }

  render() {
    return this.renderButton()
  }
}

export default Button
