// src/pages/Home.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';

import { fetchTables } from '../redux/tablesActions';
import {
  getAllTables,
  getTablesLoading,
  getTablesError,
} from '../redux/tablesSelectors';

import TablesList from '../components/tables/TablesList';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const loading = useSelector(getTablesLoading);
  const error = useSelector(getTablesError);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  if (loading) return <Spinner animation="border" role="status" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return <TablesList tables={tables} />;
};

export default Home;