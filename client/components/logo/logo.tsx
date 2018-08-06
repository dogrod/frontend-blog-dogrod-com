import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Icon from '@/components/icon'

import './logo.scss'

interface PropTypes {
  size?: LogoSize
}

export enum LogoSize {
  LARGE = 'LARGE',
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
}

const PREFIX_CLASS = 'logo'

const getClassName = (size?: LogoSize) => classNames(
  PREFIX_CLASS,
  {
    [`${PREFIX_CLASS}--large`]: size === LogoSize.LARGE,
    [`${PREFIX_CLASS}--small`]: size === LogoSize.SMALL,
  }
)

const Logo: React.SFC<PropTypes> = (props) => (
  <Link to="/" className={getClassName(props.size)}>
    <Icon name="d" />
  </Link>
)

export default Logo
