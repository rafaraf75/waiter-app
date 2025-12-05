// src/pages/TableDetails.js
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

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

  // hooki zawsze na górze
  const [status, setStatus] = useState(table?.status ?? 'Free');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount ?? 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    table?.maxPeopleAmount ?? 4
  );
  const [bill, setBill] = useState(table?.bill ?? 0);

  if (!table) {
    return <Navigate to="/" replace />;
  }

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (newStatus === 'Free' || newStatus === 'Cleaning') {
      setPeopleAmount(0);
      setBill(0);
    }

    if (newStatus === 'Busy' && bill < 0) {
      setBill(0);
    }
  };

  const handlePeopleChange = (e) => {
    let value = Number(e.target.value);
    value = clamp(value, 0, 10);
    if (value > maxPeopleAmount) value = maxPeopleAmount;
    setPeopleAmount(value);
  };

  const handleMaxPeopleChange = (e) => {
    let value = Number(e.target.value);
    value = clamp(value, 0, 10);
    setMaxPeopleAmount(value);
    if (peopleAmount > value) setPeopleAmount(value);
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

    dispatch(updateTableRequest(editedTable));
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-4">Table {table.id}</h1>

        <Form onSubmit={handleSubmit}>
          {/* STATUS */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small mb-1">Status</Form.Label>
            <Form.Select size="sm" value={status} onChange={handleStatusChange}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* PEOPLE */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold small mb-1">People</Form.Label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="number"
                size="sm"
                min={0}
                max={10}
                value={peopleAmount}
                onChange={handlePeopleChange}
                style={{ maxWidth: '70px' }}
              />
              <span>/</span>
              <Form.Control
                type="number"
                size="sm"
                min={0}
                max={10}
                value={maxPeopleAmount}
                onChange={handleMaxPeopleChange}
                style={{ maxWidth: '70px' }}
              />
            </div>
          </Form.Group>

          {/* BILL */}
          {status === 'Busy' && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold small mb-1">Bill</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <span>$</span>
                <Form.Control
                  type="number"
                  size="sm"
                  min={0}
                  value={bill}
                  onChange={handleBillChange}
                  style={{ maxWidth: '100px' }}
                />
              </div>
            </Form.Group>
          )}

          <Button type="submit" variant="primary" size="sm" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default TableDetails;