import * as React from 'react'

interface StateTypes {
  isLoggedIn: boolean
  profile: UserProfile,
  dispatch: (action: UserAction) => void
}

export interface UserProfile {
  username: string
  email: string
}

export interface UserAction {
  type: UserActionType,
  payload: UserProfile
}

export enum UserActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

const getDefaultProfile = () => { return { username: '', email: '' }}

const getDefaultState = () => {
  return {
    isLoggedIn: false,
    profile: getDefaultProfile(),
    dispatch: (_action: UserAction) => {}
  }
}

const UserContext = React.createContext(getDefaultState())

export class UserProvider extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false,
      profile: getDefaultProfile(),
      dispatch: (action: UserAction) => {
        this.setState(state => UserProvider.reducer(state, action))
      }
    }
  }

  static reducer = (state: StateTypes, action: UserAction) => {
    switch (action.type) {
      case UserActionType.LOGIN:
        return {
          ...state,
          isLoggedIn: true,
          profile: action.payload,
        }
      case UserActionType.LOGOUT:
        window.localStorage.removeItem('JW_TOKEN')

        return {
          ...state,
          isLoggedIn: false,
          profile: getDefaultProfile(),
        }
      default:
        return state
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>
    )
  }
}

export const UserConsumer = UserContext.Consumer
