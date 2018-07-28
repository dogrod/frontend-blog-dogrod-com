import * as React from 'react'

import api from '@/api'
import http from '@/utils/http'
import { UserConsumer, UserAction, UserActionType } from '@/context/user'

class CheckLogin extends React.Component {
  token: string
  dispatch: (action: UserAction) => void
  
  async componentDidMount() {
    const token = window.localStorage.getItem('JW_TOKEN')
    
    if (!token) return
    
    this.token = token

    try {
      const result: any = await this.verifyLoginStatus(token)

      this.dispatch({
        type: UserActionType.LOGIN,
        payload: {
          username: result.user.username,
          email: result.user.email,
        }
      })
      
    } catch (error) {
      console.error('An error occurred when verify user token:', error)
    }
  }

  async verifyLoginStatus(token: string) {
    const url = api.verifyLogin
    const data = {
      token,
    }

    try {
      const response: any = await http.post(url, data)

      return response
    } catch (error) {
      throw error
    }
  }

  render() {
    return (
      <UserConsumer>
        {({ dispatch }) => {
          this.dispatch = dispatch
          return null  
        }}
      </UserConsumer>
    )
  }
}

export default CheckLogin
