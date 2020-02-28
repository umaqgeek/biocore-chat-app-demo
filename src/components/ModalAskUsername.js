import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '90%',
    paddingTop            : '35px',
    paddingBottom         : '35px'
  }
};

Modal.setAppElement('#root')

class ModalAskUsername extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      modalIsOpen: this.props.isShow
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
    var username = this.state.username !== '' ? this.state.username : 'anon';
    this.props.onSaveUsername(username);
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
      <div>
        <Modal
          isOpen={this.props.isShow}
          onRequestClose={this.props.onClose}
          style={customStyles}
          contentLabel="Confirmation Modal"
        >
          <center>
            <h3 style={{color: 'red'}}>What is your username ?</h3>
            <div>{this.props.message}</div>
            <div className='mb-4'></div>
            <div>
              <input
                name='username'
                type='text'
                className='form-control'
                placeholder='Type your username here and enter'
                style={{textAlign: 'center'}}
                onChange={this.onHandler}
                onKeyDown={this.onKeyDown} />
            </div>
          </center>
        </Modal>
      </div>
    );
  };
};

export default ModalAskUsername;
