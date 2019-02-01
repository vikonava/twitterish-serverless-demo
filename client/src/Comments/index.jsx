import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { API } from "aws-amplify";

import {
  Container,
  Card,
} from "react-bootstrap";

import CommentInput from './_Create';
import Item from './_Item';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.generateItems = this.generateItems.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
    this.retrieveCallback = this.retrieveCallback.bind(this);

    this.state = {
      isFailed: false,
      isLoading: true,
      comments: [],
    };
  }

  componentDidMount() {
    const {
      history,
      signedIn,
    } = this.props;

    if (!signedIn) {
      history.push('/login');
      return;
    }

    this.refreshComments();

    this.commentsTimer = setInterval(this.refreshComments, 5000);
  }

  componentWillUnmount() {
    if (this.commentsTimer) {
      clearInterval(this.commentsTimer);
    }
  }

  generateItems() {
    const { comments } = this.state;

    const commentItems = comments.map(({
      id,
      createdAt,
      text,
      username,
    }) => (
      <Item
        key={id}
        date={new Date(createdAt).toLocaleString()}
        username={username}
        text={text}
      />
    ));

    return commentItems;
  }

  refreshComments() {
    API.get('comments', '/comments').then(this.retrieveCallback);
  }

  retrieveCallback(data) {
    this.setState({
      comments: data,
      isLoading: false,
    });
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <CommentInput />
        </Card.Header>
        <Card.Body>
          <Container>
            {this.generateItems()}
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  signedIn: state.signedIn,
});

export default connect(mapStateToProps)(withRouter(List));
