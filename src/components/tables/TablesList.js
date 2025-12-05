// src/components/tables/TablesList.js
import { Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TablesList = ({ tables }) => {
  return (
    <>
      <h1 className="mb-4">All tables</h1>

      <ListGroup>
        {tables.map((table) => (
          <ListGroup.Item
            key={table.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>Table {table.id}</strong>
              <span className="text-muted ms-3">
                Status: <span>{table.status}</span>
              </span>
            </div>

            <Button
              as={Link}
              to={`/table/${table.id}`}
              variant="primary"
              size="sm"
            >
              Show more
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default TablesList;