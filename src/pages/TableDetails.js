// src/pages/TableDetails.js
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

import { getTableById } from '../redux/tablesSelectors';

const TableDetails = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id));

  // hooki MUSZĄ być zawsze wywołane,
  // więc używamy table?.cos jako wartości startowych
  const [status, setStatus] = useState(table?.status ?? 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount ?? 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount ?? 4
  );
  const [bill, setBill] = useState(table?.bill ?? 0);

  // dopiero teraz warunkowy return – po wszystkich hookach
  if (!table) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Update will be added in the next commit!');
  };

  return (
    <Card className="p-4">
      <h1 className="mb-4">Table {table.id}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Free">Free</option>
            <option value="Reserved">Reserved</option>
            <option value="Busy">Busy</option>
            <option value="Cleaning">Cleaning</option>
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>People amount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={10}
                value={peopleAmount}
                onChange={(e) => setPeopleAmount(Number(e.target.value))}
              />
            </Form.Group>
          </Col>

        <Col>
          <Form.Group>
            <Form.Label>Max people amount</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={10}
              value={maxPeopleAmount}
              onChange={(e) => setMaxPeopleAmount(Number(e.target.value))}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Bill</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Update
      </Button>
    </Form>
  </Card>
  );
};

export default TableDetails;