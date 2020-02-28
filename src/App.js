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
  SendMessageForm,
  ModalAskUsername
} from './components';

let timer = null;
const delay = 300;
const limit = 100;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      scrolled: false,
      isShow: true
    };

    this.updateScroll = this.updateScroll.bind(this);
    this.removeAllData = this.removeAllData.bind(this);
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onSaveUsername = this.onSaveUsername.bind(this);
  };

  componentDidMount() {
    timer = setTimeout(this.getData(), delay);
  };

  componentWillUnmount() {
    clearTimeout(timer);
  };

  updateScroll() {
    if(!this.state.scrolled){
      var element = document.getElementById("message-list-box-id");
      element.scrollTop = element.scrollHeight + 500;
    }
  }

  removeAllData() {
    return axios({
      url: Constants.BASE_URL + 'messages.json',
      method: 'delete'
    })
  };

  getData() {
    this.updateScroll();
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
      var element = document.getElementById("message-list-box-id");
      element.scrollTop = element.scrollHeight + 500;
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

  onScroll() {
    this.setState({
      ...this.state,
      scrolled: true
    });
  };

  onCloseModal() {
    this.setState({
      ...this.state,
      isShow: false
    });
  };

  onSaveUsername(username) {
    var self = this;
    this.setState({
      ...this.state,
      username: username
    }, () => {
      self.onCloseModal();
    });
  };

  render() {
    return (
      <div>
        <ModalAskUsername
          isShow={this.state.isShow}
          onClose={this.onCloseModal}
          onSaveUsername={this.onSaveUsername} />
        <Title />
        <MessageList
          messages={this.state.messages}
          currentUser={this.state.username}
          onScroll={this.onScroll} />
        <SendMessageForm onSubmitMessage={this.onSubmitMessage} />
      </div>
    );
  };
};

export default App;
