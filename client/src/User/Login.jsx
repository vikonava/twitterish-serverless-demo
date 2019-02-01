import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";

import {
  Button,
  Form,
} from "react-bootstrap";

import { userLoggedIn } from '../redux/actions.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange(event) {
    const {
      id,
      value,
    } = event.target;

    this.setState({ [id]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const {
      password,
      username,
    } = this.state;

    const {
      _userLoggedIn,
      history,
    } = this.props;

    try {
      await Auth.signIn(username, password);

      _userLoggedIn(true);
      history.push('/');
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
  }

  render() {
    const {
      password,
      username,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Button
          block
          type="submit"
        >
          Login
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  _userLoggedIn: (value) => {
    dispatch(userLoggedIn(value));
  },
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
