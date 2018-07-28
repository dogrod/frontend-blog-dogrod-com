import * as React from 'react'

import './sea-wave.scss'

const PREFIX_CLASS = 'sea-wave'

const SeaWave: React.SFC = () => (
  <div className={PREFIX_CLASS}>
    <div className={`${PREFIX_CLASS}__wave`}></div>
    <div className={`${PREFIX_CLASS}__wave`}></div>
  </div>
)

export default SeaWave
