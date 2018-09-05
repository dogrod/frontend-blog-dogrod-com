import * as React from 'react'
import { Motion, spring, presets } from 'react-motion'

import Card from '@/components/card'

interface PropTypes {
  className?: string
}

/**
 * get default style for transition motion
 */
const getDefaultStyles = () => {
  return {
    translateX: 50,
    opacity: 1,
  }
}

/**
 * get style
 */
const getStyles = () => {
  return {
    translateX: spring(0, presets.gentle),
    opacity: spring(1, presets.gentle),
  }
}

const SFC: React.SFC<PropTypes> = (props) => (
  <Motion
    defaultStyle={getDefaultStyles()}
    style={getStyles()}
  >
  {style =>
    <Card
      {...props}
      style={{
        opacity: style.opacity,
        WebkitTransform: `translate(${style.translateX}px, 0)`,
        transform: `translate(${style.translateX}px, 0)`,
      }}
    >
      {props.children}
    </Card>
  }
  </Motion>
)

export default SFC
