import * as React from 'react'

import './index.scss'

interface PropTypes {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const PREFIX_CLASS = 'form'

const Form: React.SFC<PropTypes> = (props) => (
  <form className={PREFIX_CLASS} onSubmit={e => props.onSubmit(e)}>{props.children}</form>
)

export default Form