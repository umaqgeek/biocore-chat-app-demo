import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import {
  Constants,
  getNowDateTime,
  getNowTimestamp
} from './utils';

import {
  Title,
  MessageList,
  SendMessageForm
} from './components';

let timer = null;
const delay = 300;
const limit = 10;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.removeAllData = this.removeAllData.bind(this);
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  };

  componentDidMount() {
    if (this.state.username === '') {
      var username = prompt('What is your username?');
      this.setState({
        ...this.state,
        username: username
      });
    }
    timer = setTimeout(this.getData(), delay);
  };

  componentWillUnmount() {
    clearTimeout(timer);
  };

  removeAllData() {
    return axios({
      url: Constants.BASE_URL + 'messages.json',
      method: 'delete'
    })
  };

  getData() {
    var self = this;
    axios({
      url: Constants.BASE_URL + 'messages.json',
      method: 'get'
    })
    .then(res => {
      self.setState({
        ...self.state,
        messages: Object.values(res.data)
      }, () => {
        timer = setTimeout(self.getData(), delay);
      })
    })
    .catch(err => {
      self.setState({
        ...self.state,
        messages: []
      }, () => {
        timer = setTimeout(self.getData(), delay);
      })
    });
  };

  postData(message) {
    if (this.state.username === '') {
      window.location.reload(false);
      return;
    }
    axios({
      url: Constants.BASE_URL + 'messages.json',
      method: 'post',
      data: {
        username: this.state.username,
        message: message,
        datetime: getNowDateTime(),
        timestamp: getNowTimestamp()
      }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    });
  };

  onSubmitMessage(message) {
    var self = this;
    if (this.state.messages.length >= limit) {
      this.removeAllData()
      .then(res => {
        self.postData(message);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.postData(message);
    }
  };

  render() {
    return (
      <div>
        <Title />
        <MessageList messages={this.state.messages} currentUser={this.state.username} />
        <SendMessageForm onSubmitMessage={this.onSubmitMessage} />
      </div>
    );
  };
};

export default App;
