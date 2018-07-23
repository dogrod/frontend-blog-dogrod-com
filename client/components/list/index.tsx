import * as React from 'react'
import './index.scss'

const PREFIX_CLASS = 'list'

const List: React.SFC = (props) => (
  <ul className={PREFIX_CLASS}>
    {props.children}
  </ul>
)

export default List
