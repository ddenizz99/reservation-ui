import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const GeneralStats = ({reservationData}) => {

  const countNoShow = (status) => {
      var result = reservationData.reduce(function (acc, cur) {
          return cur.check_in === status ? acc + 1 : acc;
      }, 0);
      return result;
  }

  const countStatus = (status) => {
    var result = reservationData.reduce(function (acc, cur) {
        return cur.status === status ? acc + 1 : acc;
    }, 0);
    return result;
  }

  return (
    <Row className="mb-4">
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Genel</Card.Title>
            <Row className='mt-4'>
              <Col>
                <h5>{reservationData.length}</h5>
                <p>Ağırlanan</p>
              </Col>
              <Col>
                <h5>{countNoShow(String(2))}</h5>
                <p>NoShow</p>
              </Col>
              <Col>
                <h5>{countStatus(String(5))}</h5>
                <p>İptal</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralStats;
