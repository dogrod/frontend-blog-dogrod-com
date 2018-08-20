import * as React from 'react'

import './card.scss'

interface PropTypes extends React.HTMLAttributes<HTMLDivElement> {}

const PREFIX_CLASS = 'card'

const Card: React.SFC<PropTypes> = (props) => {
  const elementProps = {
    ...props,
    className: `${PREFIX_CLASS} ${props.className}`,
  }
  
  return (
    <div {...elementProps}>
      {props.children}
    </div>
  )
}

export default Card
