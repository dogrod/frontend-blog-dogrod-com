import * as React from 'react'

import './sea-wave.scss'

const PREFIX_CLASS = 'sea-wave'

const SeaWave: React.SFC = () => (
  <div className={PREFIX_CLASS}>
    <div className={`${PREFIX_CLASS}__wave`}/>
    <div className={`${PREFIX_CLASS}__wave`} />
  </div>
)

export default SeaWave
