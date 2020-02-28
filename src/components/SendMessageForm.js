import React, { Component } from 'react';

class SendMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ''
    };

    this.onHandler = this.onHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  };

  onHandler(obj) {
    this.setState({
      ...this.state,
      [obj.target.name]: obj.target.value
    });
  };

  onSubmit() {
    this.props.onSubmitMessage(this.state.message);
    this.setState({
      ...this.state,
      message: ''
    })
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.onSubmit();
    }
  };

  render() {
    return (
      <div className='send-message-form-box row'>
        <div className='col-md-8'>
          <input
            name='message'
            type='text'
            className='form-control'
            placeholder='Type your chat here and press enter'
            onChange={this.onHandler}
            onKeyDown={this.onKeyDown}
            value={this.state.message} />
        </div>
        <div className='col-md-4'>
          <button className='btn btn-primary' onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default SendMessageForm;
