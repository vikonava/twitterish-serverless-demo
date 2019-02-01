import React from 'react';
import { API } from "aws-amplify";

import {
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.node = React.createRef();

    this.handlePost = this.handlePost.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.postCallback = this.postCallback.bind(this);

    this.state = { text: '' };
  }

  handlePost() {
    const options = {
      header: {
        'Content-Type': 'application/json',
      },
      body: {
        text: this.state.text,
      },
    };

    API.post('comments', '/comments', options).then(this.postCallback);
  }

  handleTextChange(event) {
    const { value } = event.target;

    this.setState({ text: value });
  }

  postCallback() {
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;

    return (
      <InputGroup>
        <Form.Control
          type="text"
          value={text}
          onChange={this.handleTextChange}
        />
        <InputGroup.Append>
          <Button onClick={this.handlePost}>Tweet</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default Create;
