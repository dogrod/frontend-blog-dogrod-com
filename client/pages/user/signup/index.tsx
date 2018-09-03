import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Map } from 'immutable'

import Form from '@/components/form'
import Toast from '@/components/toast'
import FormItem from '@/components/form/item'
import TextField, { TextFieldSize } from '@/components/text-field'
import Button, { ButtonSize, ButtonTheme } from '@/components/button'
import { UserConsumer, UserAction, UserActionType } from '@/context/user'

import api from '@/api'
import { setTitle } from '@/utils'
import http from '@/utils/http'

import './index.scss'

const PREFIX_CLASS = 'signup'

interface FormItemTypes {
  type: string
  label: string
  placeholder: string
  value: string
}

interface PropTypes extends RouteComponentProps<{ redirect?: string }> {}

interface StateTypes {
  form: Map<string, FormItemTypes>
}

class Signup extends React.Component<PropTypes, StateTypes> {
  dispatch: (action: UserAction) => void

  constructor(props: PropTypes) {
    super(props)

    const form = Map({
      username: {
        type: 'text',
        label: '用户名',
        placeholder: '请输入用户名',
        value: '',
      },
      password1: {
        type: 'password',
        label: '密码',
        placeholder: '请输入密码',
        value: '',
      },
      password2: {
        type: 'password',
        label: '确认密码',
        placeholder: '请确认密码',
        value: '',
      },
      email: {
        type: 'text',
        label: 'Email',
        placeholder: '请输入邮箱地址',
        value: '',
      },
    })

    this.state = {
      form,
    }
  }
  
  componentDidMount() {
    setTitle('注册')
  }

  /**
   * Input change event
   * @param value - current value
   * @param key - key of current value in form
   */
  handleChange = (value: string, key: string) => {
    const formItem = this.state.form.get(key)

    if (!formItem) {
      return
    }

    formItem.value = value

    const newState = {
      form: this.state.form.set(key, formItem)
    }

    this.setState(newState)
  }

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {}

    this.state.form.forEach((item, key) => {
      data[key] = item.value
    })

    try {
      const result = await this.submitForm(data)

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
        message: '注册成功',
        duration: 500,
      })

      window.location.href = this.props.match.params.redirect || '/'
    } catch (error) {
      Toast.show(error.message)
    }
    console.log(data)
  }

  submitForm = async (data: any) => {
    const url = api.signup

    try {
      const response: any = await http.post(url, data)

      return response
    } catch (error) {
      throw error
    }
  }

  /**
   * Render form item nodes
   * @returns Return form item nodes
   */
  renderFormItemNodes = () => {
    const { form } = this.state

    return Object.keys(form.toObject()).map(key => {
      const value = form.get(key)
  
      if (!value) {
        return null
      }
  
      return (
        <FormItem key={key}>
          <TextField
            type={value.type}
            label={value.label}
            placeholder={value.placeholder}
            size={TextFieldSize.LARGE}
            value={value.value}
            onChange={e => this.handleChange(e.target.value, key)}
          />
        </FormItem>
      )
    })
  }

  render() {
    const { handleSubmit, renderFormItemNodes } = this

    return (
      <Form className={PREFIX_CLASS} onSubmit={handleSubmit}>
        {renderFormItemNodes()}
        <FormItem className={`${PREFIX_CLASS}__submit`}>
          <Button
            type="submit"
            shadow={true}
            block={true}
            size={ButtonSize.LARGE}
            theme={ButtonTheme.DARK}
          >
            注册
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

export default Signup
