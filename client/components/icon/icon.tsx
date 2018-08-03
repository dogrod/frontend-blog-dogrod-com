import * as React from 'react'

import './icon.scss'

interface PropTypes {
  name: string
}

const PREFIX_CLASS = 'icon'

const SFC: React.SFC<PropTypes> = props => (
  <svg className={PREFIX_CLASS} aria-hidden="true">
    <use xlinkHref={`#icon-${props.name}`} />
  </svg>
)

export default SFC
