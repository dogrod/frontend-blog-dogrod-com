import * as React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

import Omit from '@/types/utils/omit'
import { generateUID } from '@/utils'

import './text-field.scss'

interface PropTypes extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: TextFieldSize
  label?: string
}

interface StateTypes {
  isFocusing: boolean
}

export enum TextFieldSize {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const PREFIX_CLASS = 'text-field'

class Input extends React.Component<PropTypes, StateTypes> {
  id?: string

  constructor(props: {}) {
    super(props)

    this.id = generateUID('text-field-c')
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
        [`${PREFIX_CLASS}--small`]: size === TextFieldSize.SMALL,
        [`${PREFIX_CLASS}--large`]: size === TextFieldSize.LARGE,
        [`${PREFIX_CLASS}--active`]: this.state.isFocusing || value,
      },
      this.props.className,
    )
  }

  getNativeLikeAttributes = () => omit(this.props, ['size', 'className', 'label', 'children'])

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

  renderTextField = () => (
    <div className={this.getClassName()}>
      {this.renderLabel(this.props.label)}
      {this.renderInputElement()}
      {this.renderUnderline()}
      {}
    </div>
  )

  render() {
    return this.renderTextField()
  }
}

export default Input
