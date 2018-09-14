import * as React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

import './button.scss'

interface PropTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  theme?: ButtonTheme
  shadow?: boolean
  round?: boolean
  block?: boolean
}

export enum ButtonTheme {
  DARK = 'DARK',
  PRIMARY = 'PRIMARY',
  DANGER = 'DANGER',
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const PREFIX_CLASS = 'button'

class Button extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props)
  }

  getClassName = () => {
    const { size, theme, shadow, round, block } = this.props

    const classes = [
      PREFIX_CLASS,
      size ? `${PREFIX_CLASS}--${size.toLowerCase()}` : null,
      theme ? `${PREFIX_CLASS}--${theme.toLowerCase()}` : null,
      shadow ? `${PREFIX_CLASS}--shadow` : null,
      round ? `${PREFIX_CLASS}--round` : null,
      block ? `${PREFIX_CLASS}--block` : null,
      this.props.className,
    ]

    return classNames(...classes)
  }

  getNativeAttributes = () => omit(
    this.props,
    [
      'size',
      'theme',
      'className',
      'children',
      'shadow',
      'round',
      'block',
    ]
  )

  renderButton = () => {
    return (<button {...this.getNativeAttributes()} className={this.getClassName()}>{this.props.children}</button>)
  }

  render() {
    return this.renderButton()
  }
}

export default Button
