import * as React from 'react'
import TextField, { TextFieldSize } from '@/components/text-field'
import Button, { ButtonTheme } from '@/components/button'

import './editor.scss'

interface StateTypes {
  isFocusing: boolean
}

const PREFIX_CLASS = 'comment-editor'

class CommentEditor extends React.Component<{}, StateTypes> {
  constructor(props: {}) {
    super(props)

    this.state = {
      isFocusing: false
    }
  }

  setFocusState = (isFocusing: boolean) => {
    this.setState({ isFocusing })
  }

  render() {
    const { isFocusing } = this.state
  
    return (
      <div className={`${PREFIX_CLASS}__new-comment`}>
        <TextField
          type="textarea"
          placeholder="想说点什么？"
          size={TextFieldSize.LARGE}
          fixed={true}
          ghost={true}
          onFocus={() => this.setFocusState(true)}
          onBlur={() => this.setFocusState(false)}
        />
        <div
          className={`${PREFIX_CLASS}__action`}
          style={{
            display: isFocusing ? 'block' : 'none',
          }}
        >
          <Button theme={ButtonTheme.PRIMARY}>提交</Button>
        </div>
      </div>
    )
  }
}

export default CommentEditor
