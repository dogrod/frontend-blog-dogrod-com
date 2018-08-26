import * as React from 'react'
import TextField, { TextFieldSize } from '@/components/text-field'
import Button, { ButtonTheme } from '@/components/button'

import './editor.scss'

interface PropTypes {
  onSubmit: (content: string) => Promise<any>
}

interface StateTypes {
  isFocusing: boolean
  text: string
}

const PREFIX_CLASS = 'comment-editor'

class CommentEditor extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props)

    this.state = {
      isFocusing: false,
      text: '',
    }
  }

  handleChange = (text: string) => {
    this.setState({ text })
  }

  handleClickSubmit = async () => {
    await this.props.onSubmit(this.state.text)

    this.clearEditorContext()
  }

  clearEditorContext = () => {
    this.setState({ text: '' })
    // this.setFocusState(false)
  }

  setFocusState = (isFocusing: boolean) => {
    this.setState({ isFocusing })
  }

  render() {
    const { handleChange, handleClickSubmit, setFocusState } = this
    const { isFocusing, text } = this.state
  
    return (
      <div className={`${PREFIX_CLASS}__new-comment`}>
        <TextField
          type="textarea"
          placeholder="想说点什么？"
          size={TextFieldSize.LARGE}
          fixed={true}
          ghost={true}
          value={text}
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
          onChange={e => handleChange(e.target.value)}
        />
        <div
          className={`${PREFIX_CLASS}__action`}
          style={{
            display: isFocusing || text ? 'block' : 'none',
          }}
        >
          <Button
            theme={ButtonTheme.PRIMARY}
            onClick={handleClickSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

export default CommentEditor
