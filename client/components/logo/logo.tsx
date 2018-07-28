import * as React from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/icon_d.svg'

import './logo.scss'

const PREFIX_CLASS = 'logo'

const Logo: React.SFC = () => (
  <Link to="/" className={PREFIX_CLASS}>
    <img src={logo} />
  </Link>
)

export default Logo
