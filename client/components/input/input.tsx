import * as React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

import Omit from '@/types/utils/omit'
import { generateUID } from '@/utils'

import './input.scss'

export enum InputSize {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

interface PropTypes extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
  label?: string
}

interface StateTypes {
  isFocusing: boolean
}

const PREFIX_CLASS = 'input'

class Input extends React.Component<PropTypes, StateTypes> {
  id?: string

  constructor(props: {}) {
    super(props)

    this.id = generateUID('input-c')
    this.state = {
      isFocusing: false
    }
  }

  setFocusState = (isFocusing: boolean) => {
    this.setState({
      isFocusing,
    })
  }

  getClassName = () => {
    const { size, value } = this.props

    return classNames(
      PREFIX_CLASS,
      {
        [`${PREFIX_CLASS}--small`]: size === InputSize.SMALL,
        [`${PREFIX_CLASS}--large`]: size === InputSize.LARGE,
        [`${PREFIX_CLASS}--active`]: this.state.isFocusing || value,
      }
    )
  }

  getNativeLikeAttributes = () => omit(this.props, ['size', 'className', 'label'])

  renderLabel = (label?: string) => label ? <label className={`${PREFIX_CLASS}__label`} htmlFor={this.id}>{label}</label> : null

  renderInputElement = () => (
    <input
      {...this.getNativeLikeAttributes()}
      id={this.id}
      className={`${PREFIX_CLASS}__control`}
      onFocus={() => this.setFocusState(true)}
      onBlur={() => this.setFocusState(false)} />
  )

  renderUnderline = () => <div className={`${PREFIX_CLASS}__underline`}><hr/><hr/></div>

  renderTextInput = () => (
    <div className={this.getClassName()}>
      {this.renderLabel(this.props.label)}
      {this.renderInputElement()}
      {this.renderUnderline()}
      {}
    </div>
  )

  renderButtonInput = () => (
    <input {...this.getNativeLikeAttributes()} className={this.getClassName()} />
  )

  render() {
    const { type } = this.props

    let element = null

    switch (type) {
      case 'button':
      case 'submit':
        element = this.renderButtonInput()
        break
      default:
        element = this.renderTextInput()
    }

    return element
  }
}

export default Input
