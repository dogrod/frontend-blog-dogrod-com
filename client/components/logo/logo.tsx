import * as React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Icon from '@/components/icon'

import './logo.scss'

interface PropTypes {
  className?: string
  size?: LogoSize
}

export enum LogoSize {
  LARGE = 'LARGE',
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
}

const PREFIX_CLASS = 'logo'

const getClassName = (props: PropTypes) => classNames(
  PREFIX_CLASS,
  {
    [`${PREFIX_CLASS}--large`]: props.size === LogoSize.LARGE,
    [`${PREFIX_CLASS}--small`]: props.size === LogoSize.SMALL,
  },
  props.className,
)

const Logo: React.SFC<PropTypes> = (props) => (
  <Link to="/" className={getClassName(props)}>
    <Icon name="d" />
  </Link>
)

export default Logo
