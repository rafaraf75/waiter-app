// src/components/tables/TablesList.js
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TablesList = ({ tables }) => {
  return (
    <>
      <h1 className="mb-4">All tables</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.status}</td>
              <td>
                <Button as={Link} to={`/table/${table.id}`} variant="primary">
                  Show more
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default TablesList;