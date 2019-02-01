import React from 'react';

import {
  Col,
  Image,
  Row,
} from "react-bootstrap";

const Items = ({
  date,
  text,
  username,
}) => (
  <Row style={{ marginBottom: 10 }}>
    <Col xs="2">
      <Image src="https://openclipart.org/download/247324/abstract-user-flat-1.svg" width="100%" />
    </Col>
    <Col>
      <div>
        <b>{username}</b> {date}
      </div>
      <div>{text}</div>
    </Col>
  </Row>
);

export default Items;
