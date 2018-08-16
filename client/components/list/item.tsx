import * as React from 'react'
import './item.scss'

interface PropStyle extends React.LiHTMLAttributes<HTMLLIElement> {}

const PREFIX_CLASS = 'list-item'

const ListItem: React.SFC<PropStyle> = (props) => {
  const elementProps = {
    ...props,
    className: PREFIX_CLASS,
  }
  
  return (
    <li {...elementProps}>{props.children}</li>
  )
}

export default ListItem
