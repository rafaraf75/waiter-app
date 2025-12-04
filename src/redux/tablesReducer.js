// initialState
const initialState = {
  data: [],      // tablica stolików
  loading: false,
  error: null,
};

// action types
const FETCH_TABLES_START = 'app/tables/FETCH_START';
const FETCH_TABLES_SUCCESS = 'app/tables/FETCH_SUCCESS';
const FETCH_TABLES_ERROR = 'app/tables/FETCH_ERROR';

const UPDATE_TABLE_START = 'app/tables/UPDATE_START';
const UPDATE_TABLE_SUCCESS = 'app/tables/UPDATE_SUCCESS';
const UPDATE_TABLE_ERROR = 'app/tables/UPDATE_ERROR';

const tablesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TABLES_START:
      return { ...state, loading: true, error: null };
    case FETCH_TABLES_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_TABLES_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_TABLE_START:
      return { ...state, loading: true, error: null };
    case UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((table) =>
          table.id === action.payload.id ? action.payload : table
        ),
      };
    case UPDATE_TABLE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default tablesReducer;