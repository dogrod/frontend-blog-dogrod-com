import * as React from 'react'
import classNames from 'classnames'

import './item.scss'

interface PropTypes {
  label?: string
}

const PREFIX_CLASS = 'form-item'

const renderLabel = (label?: string) => {
  return label ? (
    <div className={`${PREFIX_CLASS}__label`}>
      <label>{label}</label>
    </div>
  ) : null
}

const renderChildren = (children: React.ReactNode, offset: boolean = false) => {
  const className = classNames({
    [`${PREFIX_CLASS}__control-wrapper`]: true,
    [`${PREFIX_CLASS}__control-wrapper--offset`]: offset,
  })

  return (
    <div className={className}>
      <div className={`${PREFIX_CLASS}__control`}>
        {children}
      </div>
    </div>
  )
}

const FormItem: React.SFC<PropTypes> = props => (
  <div className={PREFIX_CLASS}>
    {renderLabel(props.label)}
    {renderChildren(props.children)}
  </div>
)

export default FormItem
