import * as React from 'react'

import './index.scss'

interface ListProps {
  children: JSX.Element[]
}

const List = (props: ListProps) => <ul className="list">{props.children}</ul>

export default List