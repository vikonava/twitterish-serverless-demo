import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Header from './Navigation/Header';
import Login from './User/Login';
import Comments from './Comments';

import {
  Container,
  Row,
  Col,
} from "react-bootstrap";

const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Comments />,
  }, {
    path: '/login',
    exact: true,
    main: () => <Login />,
  }
];

const Application = () => (
  <Router>
    <Container>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row style={{ marginTop: 15 }}>
        <Col>
          {
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))
          }
        </Col>
      </Row>
    </Container>
  </Router>
);

export default Application;
