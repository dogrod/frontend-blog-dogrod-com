import * as React from 'react'
import update from 'immutability-helper'
import { RouteComponentProps } from 'react-router-dom'

import http from '@/utils/http'
import api from '@/api'
import { setTitle } from '@/utils'

import Form from '@/components/form'
import FormItem from '@/components/form/item'
import TextField, { TextFieldSize } from '@/components/text-field'
import Button from '@/components/button'

import './index.scss'

interface LoginForm {
  username: string
  password: string
}

interface PropTypes extends RouteComponentProps<{}> {}

interface StateTypes {
  form: LoginForm
}

const PREFIX_CLASS = 'login'

class Login extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      form: {
        username: '',
        password: '',
      },
    }
  }

  componentDidMount() {
    setTitle('登录')
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
      
      window.localStorage.setItem('JW_TOKEN', result.token)

      this.props.history.push('/')
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

      return response
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
        <Form onSubmit={e => handleSubmit(e)}>
          <FormItem>
            <TextField
              type="text"
              label="用户名"
              placeholder="请输入用户名"
              value={form.username}
              size={TextFieldSize.LARGE}
              onChange={e => handleChange(e.target.value, 'username')}/>
          </FormItem>
          <FormItem>
            <TextField
              type="password"
              label="密码"
              placeholder="请输入密码"
              value={form.password}
              size={TextFieldSize.LARGE}
              onChange={e => handleChange(e.target.value, 'password')} />
          </FormItem>
          <FormItem>
            <Button type="submit">登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Login
