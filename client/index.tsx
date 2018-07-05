import * as React from 'react'
import * as ReactDom from 'react-dom'

import 'babel-polyfill'
import 'normalize.css'

import App from './app'

ReactDom.render(
  (
    <App />
  ),
  document.getElementById('app')
)