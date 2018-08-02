import * as React from 'react'

import './divider.scss'

const PREFIX_CLASS = 'divider'

const Divider: React.SFC = props => (
  <div className={PREFIX_CLASS}>
    {props.children}
  </div>
)

export default Divider
