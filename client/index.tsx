import * as React from 'react'
import * as ReactDom from 'react-dom'
import BrowserLogger from 'alife-logger'

import 'babel-polyfill'
import 'normalize.css'

import App from './app'

BrowserLogger.singleton({
  pid: __ARMS_PID__,
  imgUrl: 'https://arms-retcode.aliyuncs.com/r.png?',
  enableSPA: true,
  useFmp: true,
})

ReactDom.render(
  (
    <App />
  ),
  document.getElementById('app')
)
