import * as React from 'react'
import classNames from 'classnames'
import omit from 'omit.js'

import Omit from '@/types/utils/omit'
import { generateUID } from '@/utils'

import './text-field.scss'

interface PropTypes extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: TextFieldSize
  label?: string
  // Fix label position
  fixed?: boolean
  // Ghost mode, hide underline
  ghost?: boolean
}

interface StateTypes {
  isFocusing: boolean
  isTextArea: boolean
}

export enum TextFieldSize {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

const PREFIX_CLASS = 'text-field'

class TextField extends React.Component<PropTypes, StateTypes> {
  id?: string

  /**
   * getDerivedStateFromProps hook (after React 16)
   * Cache isTextArea
   */
  static getDerivedStateFromProps(props: PropTypes, state: StateTypes) {
    const isTextArea = props.type === 'textarea'

    if (state.isTextArea !== isTextArea) {
      return {
        isTextArea,
      }
    }

    return null
  }

  constructor(props: PropTypes) {
    super(props)

    this.id = generateUID('text-field-c')
    this.state = {
      isFocusing: false,
      isTextArea: false,
    }
  }

  /**
   * Input/ Textarea focus event, cache focus state first
   * @param e - native focus event payload
   */
  handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setFocusState(true)

    const { onFocus } = this.props

    if (onFocus) {
      onFocus(e)
    }
  }

  /**
   * Input/ Textarea blur event, cache focus state first
   * @param e - native focus event payload
   */
  handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setFocusState(false)

    const { onBlur } = this.props

    if (onBlur) {
      onBlur(e)
    }
  }

  /**
   * Set value of state.isFocusing
   * @param isFocusing - target value
   */
  setFocusState = (isFocusing: boolean) => {
    this.setState({
      isFocusing,
    })
  }

  /**
   * Get root element's class name
   * @returns class name
   */
  getClassName = () => {
    const { size, value, fixed } = this.props

    const classes = [
      PREFIX_CLASS,
      size ? `${PREFIX_CLASS}--${size.toLowerCase()}` : null,
      fixed ? `${PREFIX_CLASS}--fixed` : null,
      this.state.isFocusing || value ? `${PREFIX_CLASS}--active` : null,
      this.props.className
    ]

    return classNames(...classes)
  }

  getAttributes = () => {
    const { handleFocus, handleBlur } = this
    return {
      ...omit(this.props, ['size', 'className', 'label', 'children']),
      id: this.id,
      onFocus: handleFocus,
      onBlur: handleBlur,
    }
  }

  renderLabel = (label?: string) => {
    return label
      ? <label className={`${PREFIX_CLASS}__label`} htmlFor={this.id}>{label}</label>
      : null
  }

  renderInputElement = () => {
    return (
      <div className={`${PREFIX_CLASS}__control`}>
        {
          this.props.type === 'textarea'
          ? (
            <textarea {...this.getAttributes()}/>
          ) : (
            <input {...this.getAttributes()}/>
          )
        }
      </div>
    )
  }

  renderUnderline = () => <div className={`${PREFIX_CLASS}__underline`}><hr/><hr/></div>

  renderTextField = () => (
    <div className={this.getClassName()}>
      {this.renderLabel(this.props.label)}
      {this.renderInputElement()}
      {!this.props.ghost ? this.renderUnderline() : null}
    </div>
  )

  render() {
    return this.renderTextField()
  }
}

export default TextField
