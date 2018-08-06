import * as React from 'react'

import './card.scss'

const PREFIX_CLASS = 'card'

const Card: React.SFC = (props) => (
  <div className={PREFIX_CLASS}>
    {props.children}
  </div>
)

export default Card
