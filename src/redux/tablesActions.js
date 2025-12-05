import { API_URL } from '../config';

// typy akcji – te same stringi co w reducerze
const FETCH_TABLES_START = 'app/tables/FETCH_START';
const FETCH_TABLES_SUCCESS = 'app/tables/FETCH_SUCCESS';
const FETCH_TABLES_ERROR = 'app/tables/FETCH_ERROR';

const UPDATE_TABLE_START = 'app/tables/UPDATE_START';
const UPDATE_TABLE_SUCCESS = 'app/tables/UPDATE_SUCCESS';
const UPDATE_TABLE_ERROR = 'app/tables/UPDATE_ERROR';

// zwykłe kreatory akcji
const fetchTablesStart = () => ({ type: FETCH_TABLES_START });
const fetchTablesSuccess = (tables) => ({
  type: FETCH_TABLES_SUCCESS,
  payload: tables,
});
const fetchTablesError = (err) => ({
  type: FETCH_TABLES_ERROR,
  payload: err,
});

const updateTableStart = () => ({ type: UPDATE_TABLE_START });
const updateTableSuccess = (table) => ({
  type: UPDATE_TABLE_SUCCESS,
  payload: table,
});
const updateTableError = (err) => ({
  type: UPDATE_TABLE_ERROR,
  payload: err,
});

// thunk – pobranie wszystkich stolików
export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchTablesStart());

    fetch(`${API_URL}/tables`)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => dispatch(fetchTablesSuccess(data)))
      .catch((err) => dispatch(fetchTablesError(err.message)));
  };
};

// thunk – update jednego stolika
export const updateTableRequest = (table) => {
  return (dispatch) => {
    dispatch(updateTableStart());

    const options = {
      method: 'PATCH', // lub PUT, jeśli chcesz wysyłać cały obiekt
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    };

    fetch(`${API_URL}/tables/${table.id}`, options)
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((updated) => dispatch(updateTableSuccess(updated)))
      .catch((err) => dispatch(updateTableError(err.message)));
  };
};