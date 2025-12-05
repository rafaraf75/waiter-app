// src/pages/TableDetails.js
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

import { getTableById, getTablesLoading } from '../redux/tablesSelectors';
import { updateTableRequest } from '../redux/tablesActions';

const STATUSES = ['Free', 'Reserved', 'Busy', 'Cleaning'];

const clamp = (value, min, max) => {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const TableDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const table = useSelector((state) => getTableById(state, id));
  const loading = useSelector(getTablesLoading);

  // hooki zawsze na górze – używamy bezpiecznych wartości startowych
  const [status, setStatus] = useState(table?.status ?? 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount ?? 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount ?? 4
  );
  const [bill, setBill] = useState(table?.bill ?? 0);

  // dopiero po hookach możemy zrobić warunkowy return
  if (!table) {
    return <Navigate to="/" replace />;
  }

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // 4. Cleaning / Free -> zerujemy people + bill
    if (newStatus === 'Free' || newStatus === 'Cleaning') {
      setPeopleAmount(0);
      setBill(0);
    }

    // 3. Busy -> pokazujemy bill (pole i tak jest, ale ustawmy start na 0 jeśli było puste)
    if (newStatus === 'Busy' && bill < 0) {
      setBill(0);
    }
  };

  const handlePeopleChange = (e) => {
    let value = Number(e.target.value);
    // 5. people 0–10
    value = clamp(value, 0, 10);
    // 5. people ≤ maxPeople
    if (value > maxPeopleAmount) {
      value = maxPeopleAmount;
    }
    setPeopleAmount(value);
  };

  const handleMaxPeopleChange = (e) => {
    let value = Number(e.target.value);
    // 5. maxPeople 0–10
    value = clamp(value, 0, 10);
    setMaxPeopleAmount(value);

    // 5. jeśli max zmalał poniżej people -> obcinamy people
    if (peopleAmount > value) {
      setPeopleAmount(value);
    }
  };

  const handleBillChange = (e) => {
    let value = Number(e.target.value);
    if (Number.isNaN(value) || value < 0) value = 0;
    setBill(value);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const editedTable = {
    id: table.id,
    status,
    peopleAmount,
    maxPeopleAmount,
    bill: status === 'Busy' ? bill : 0,
  };

  // 6. modyfikacja w magazynie + na serwerze
  dispatch(updateTableRequest(editedTable));

  // 7. po update wracamy na stronę główną
  navigate('/');
};

  return (
    <Card className="p-4">
      <h1 className="mb-4">Table {table.id}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select value={status} onChange={handleStatusChange}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
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
                onChange={handlePeopleChange}
              />
              <Form.Text muted>
                {peopleAmount} / {maxPeopleAmount}
              </Form.Text>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Max people amount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={10}
                value={maxPeopleAmount}
                onChange={handleMaxPeopleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {status === 'Busy' && (
          <Form.Group className="mb-3">
            <Form.Label>Bill</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={bill}
              onChange={handleBillChange}
            />
          </Form.Group>
        )}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </Card>
  );
};

export default TableDetails;