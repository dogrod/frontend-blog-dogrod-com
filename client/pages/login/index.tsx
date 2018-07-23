import * as React from 'react'
import update from 'immutability-helper'

import http from '@/utils/http'
import api from '@/api'

import './index.scss'

interface LoginForm {
  username: string
  password: string
}

interface StateTypes {
  form: LoginForm
}

const PREFIX_CLASS = 'login'

class Login extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      form: {
        username: '',
        password: '',
      },
    }
  }

  /**
   * Handle input change event
   * @param value - current value
   * @param key - key of current value in form
   */
  handleChange = (value: string, key: string) => {
    const newState = update(this.state, {
      form: {
        $merge: {
          [key]: value
        }
      }
    })

    this.setState(newState)
  }

  /**
   * Handle form submit event
   * @param e - event payload
   */
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result: any = await this.submitLoginForm(this.state.form)
      
      console.log(result)
      window.localStorage.setItem('JW_TOKEN', result.token)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Submit login form data
   * @param data - data to submit
   * @returns promise instance
   */
  submitLoginForm = async (data: LoginForm) => {
    const url = api.login
    
    try {
      const response: any = await http.post(url, data)

      return response.result
    } catch (error) {
      throw error
    }
  }

  render() {
    const { state, handleChange, handleSubmit } = this
    const { form } = state

    return (
      <div className={PREFIX_CLASS}>
        <h2>登录</h2>
        <hr className="divider" />
        <form onSubmit={e => handleSubmit(e)}>
          <div className={`${PREFIX_CLASS}__row`}>
            <label>
              用户名：
              <input type="text" value={form.username} onChange={e => handleChange(e.target.value, 'username')} />
            </label>
          </div>
          <div className={`${PREFIX_CLASS}__row`}>
            <label>
              密码：
              <input type="password" value={form.password} onChange={e => handleChange(e.target.value, 'password')} />
            </label>
          </div>
          <div className={`${PREFIX_CLASS}__row`}>
            <input type="submit" value="登录" />
          </div>
        </form>
      </div>
    )
  }
}

export default Login
