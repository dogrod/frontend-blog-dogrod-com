import * as React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'

import Card from '@/components/card'
import Logo from '@/components/logo'
import SeaWave from '@/components/sea-wave'

import DynamicLoad from '@/services/dynamic-load'

import './index.scss'
import { LogoSize } from '@/components/logo/logo';

const PREFIX_CLASS = 'user'

const User: React.SFC<RouteComponentProps<{}>> = (props) => {
  return (
    <div className={PREFIX_CLASS}>
      <Card className={`${PREFIX_CLASS}__content`}>
        <Logo className={`${PREFIX_CLASS}__logo`} size={LogoSize.LARGE} />
        <Route
          key="login"
          path={`${props.match.path}/login`}
          component={DynamicLoad(() => import('@/pages/user/login'))}
        />
        <Route
          key="signup"
          path={`${props.match.path}/signup`}
          component={DynamicLoad(() => import('@/pages/user/signup'))}
        />
      </Card>
      <SeaWave />
    </div>
  )
}

export default User
