import * as React from 'react'
import './item.scss'

const PREFIX_CLASS = 'list-item'

const ListItem: React.SFC = (props) => (
  <li className={PREFIX_CLASS}>{props.children}</li>
)

export default ListItem
