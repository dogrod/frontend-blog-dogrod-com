import * as React from 'react'

interface StateTypes {
  isLoggedIn: boolean
  profile: UserProfile,
  dispatch: (action: UserAction) => void
}

export interface UserProfile {
  username: string
  email: string
  nickName?: string
}

export interface UserAction {
  type: UserActionType,
  payload: UserProfile
}

export enum UserActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EXPIRE = 'EXPIRE',
}

const getDefaultProfile = () => {
  return {
    username: '',
    email: '',
  }
}

const getDefaultState = () => {
  return {
    isLoggedIn: false,
    profile: getDefaultProfile(),
    dispatch: (_action: UserAction) => { return }
  }
}

const UserContext = React.createContext(getDefaultState())

export class UserProvider extends React.Component<{}, StateTypes> {
  static reducer = (state: StateTypes, action: UserAction) => {
    switch (action.type) {
      case UserActionType.LOGIN:
        return {
          ...state,
          isLoggedIn: true,
          profile: action.payload,
        }
      case UserActionType.EXPIRE:
      case UserActionType.LOGOUT:
        window.localStorage.removeItem('DR_JW_TOKEN')

        return {
          ...state,
          isLoggedIn: false,
          profile: getDefaultProfile(),
        }
      default:
        return state
    }
  }

  constructor(props: {}) {
    super(props)

    this.state = {
      isLoggedIn: false,
      profile: getDefaultProfile(),
      dispatch: (action: UserAction) => {
        this.setState((state) => UserProvider.reducer(state, action))
      }
    }
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>
    )
  }
}

export const UserConsumer = UserContext.Consumer
