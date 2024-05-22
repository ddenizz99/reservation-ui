import React from 'react';
import { Table, Card } from 'react-bootstrap';

const DataTable = ({mainTitle, subTitle, data}) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Misafir Sayıları - {mainTitle}</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>{subTitle}</th>
              <th>Öğle Yemeği</th>
              <th>Akşam Yemeği</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, key) => (
              <tr key={key}>
                <td>{value.day}</td>
                <td>{value.noon}</td>
                <td>{value.evening}</td>
                <td>{value.total}</td>
              </tr>
            ))}
            {/* Add more rows as needed */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default DataTable;
