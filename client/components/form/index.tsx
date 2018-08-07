import * as React from 'react'
import classNames from 'classnames'

import './index.scss'

interface PropTypes {
  className?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const PREFIX_CLASS = 'form'

const getClassName = (className?: string) => classNames(PREFIX_CLASS, className)

const Form: React.SFC<PropTypes> = (props) => (
  <form
    className={getClassName(props.className)}
    onSubmit={(e) => props.onSubmit && props.onSubmit(e)}
  >
    {props.children}
  </form>
)

export default Form