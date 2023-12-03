import React, { Component, PureComponent, memo } from 'react'

// eslint-disable-next-line
const Close = memo(() => {
  return <button style={{ marginLeft: 16 }}>Очистить</button>
})

interface IInput {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class Input extends PureComponent<IInput> {
  constructor(props: IInput) {
    super(props)
  }

  render() {
    return (
      <label>
        <input onChange={this.props.onChange} />
        <Close />
      </label>
    )
  }
}

export default class Pop extends Component {
  state = {
    value: '',
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    this.setState({ value })
  }

  render() {
    const { value } = this.state

    return (
      <React.Fragment>
        <h1>Value is [{value}]</h1>
        <Input onChange={this.onChange} />
      </React.Fragment>
    )
  }
}
