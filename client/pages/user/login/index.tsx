import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Immutable from 'immutable'

import http from '@/utils/http'
import api from '@/api'
import { setTitle } from '@/utils'

import Form from '@/components/form'
import FormItem from '@/components/form/item'
import TextField, { TextFieldSize } from '@/components/text-field'
import Button, { ButtonSize, ButtonTheme } from '@/components/button'
import { UserConsumer, UserAction, UserActionType } from '@/context/user'
import Toast from '@/components/toast'

import './index.scss'

interface LoginForm extends Immutable.Map<string, string> {}

interface PropTypes extends RouteComponentProps<{ redirect?: string }> {}

interface StateTypes {
  form: LoginForm
}

const PREFIX_CLASS = 'login'

class Login extends React.Component<PropTypes, StateTypes> {
  dispatch: (action: UserAction) => void

  constructor(props: PropTypes) {
    super(props)

    const form = Immutable.Map({
      username: '',
      password: '',
    })

    this.state = {
      form,
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
    const newState = {
      form: this.state.form.set(key, value)
    }

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
      
      const { user } = result

      this.dispatch({
        type: UserActionType.LOGIN,
        payload: {
          username: user.username,
          email: user.email,
          nickName: user.nickName,
        }
      })

      window.localStorage.setItem('DR_JW_TOKEN', result.token)

      await Toast.show({
        message: '登录成功',
        duration: 500,
      })

      window.location.href = this.props.match.params.redirect || '/'
    } catch (error) {
      Toast.show(error.message)
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
      <Form className={PREFIX_CLASS} onSubmit={e => handleSubmit(e)}>
        <FormItem>
          <TextField
            type="text"
            label="用户名"
            placeholder="请输入用户名"
            value={form.get('username')}
            size={TextFieldSize.LARGE}
            onChange={e => handleChange(e.target.value, 'username')}
          />
        </FormItem>
        <FormItem>
          <TextField
            type="password"
            label="密码"
            placeholder="请输入密码"
            value={form.get('password')}
            size={TextFieldSize.LARGE}
            onChange={e => handleChange(e.target.value, 'password')}
          />
        </FormItem>
        <FormItem className={`${PREFIX_CLASS}__submit`}>
          <Button
            type="submit"
            shadow={true}
            block={true}
            size={ButtonSize.LARGE}
            theme={ButtonTheme.DARK}
          >
            登录
          </Button>
        </FormItem>
        <UserConsumer>
          {({ dispatch }) => {
            this.dispatch = dispatch
            return null
          }}
        </UserConsumer>
      </Form>
    )
  }
}

export default Login
