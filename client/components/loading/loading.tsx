import * as React from 'react'

interface PropTypes {
  error?: boolean
}

const Loading: React.SFC<PropTypes> = (props) => {
  if (props.error) {
    return (
      <div>Error!</div>
    )
  }
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Loading
