import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    return (
      <div className='message-list-box'>
        {this.props.messages.map((m, i) => {
          var rightStyle = this.props.currentUser === m.username ? {marginLeft: 'auto', marginRight: 0} : {};
          var usernameView = this.props.currentUser === m.username ? (
            <span></span>
          ) : (
            <div className='username'>{m.username.toUpperCase()}</div>
          );
          return (
            <div key={i} className='box-message' style={rightStyle}>
              {usernameView}
              <div className='message'>{m.message}</div>
              <div className='datetime'>{m.datetime}</div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default MessageList;
