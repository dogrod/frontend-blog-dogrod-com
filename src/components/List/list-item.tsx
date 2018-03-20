import * as React from 'react'
import { Link } from 'react-router-dom'

import './list-item.scss'

interface ListItemProps {
  title: string
  publishTime: string
  url: string
  summary: string
}

const ListItem = (props: ListItemProps) => (
  <li className="list-item">
    <div className="list-item__publish-time">{props.publishTime}</div>
    <div className="list-item__content">
      <div className="list-item__title">
        <Link to={props.url}>
          {props.title}
        </Link>
      </div>
      <div className="list-item__summary">
        <div
          dangerouslySetInnerHTML={{__html: props.summary}}
        />
        <span className="list-item__summary__view">
          <Link to={props.url}>
            查看全文
          </Link>
        </span>
      </div>
    </div>
  </li>
)

export default ListItem