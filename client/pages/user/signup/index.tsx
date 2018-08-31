import * as React from 'react'

import Form from '@/components/form'
import FormItem from '@/components/form/item'
import Button, { ButtonSize, ButtonTheme } from '@/components/button'
import TextField, { TextFieldSize } from '@/components/text-field'

import { setTitle } from '@/utils'

import './index.scss'

const PREFIX_CLASS = 'signup'

class Signup extends React.Component {
  componentDidMount() {
    setTitle('注册')
  }

  render() {
    return (
      <Form className={PREFIX_CLASS}>
        <FormItem>
          <TextField
            type="text"
            label="用户名"
            placeholder="请输入用户名"
            size={TextFieldSize.LARGE}
          />
        </FormItem>
        <FormItem>
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
      </Form>
    )
  }
}

export default Signup
