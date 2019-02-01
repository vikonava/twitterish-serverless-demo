import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";

import {
  Nav,
  Navbar,
} from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.renderRightSideMenu = this.renderRightSideMenu.bind(this);
  }

  renderRightSideMenu() {
    const { authenticated } = this.props;

    if (authenticated) {
      return <div>Logged in</div>;
    }

    return (
      <Nav>
        <LinkContainer to="/signup">
          <Nav.Link>Signup</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Login</Nav.Link>
        </LinkContainer>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar bg="light">
        <Navbar.Brand>
          Twitterish Example
        </Navbar.Brand>
        <Navbar.Collapse>
          {this.renderRightSideMenu()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

export default connect(mapStateToProps)(Header);
