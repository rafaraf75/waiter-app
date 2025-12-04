export const getAllTables = (state) => state.tables.data;
export const getTablesLoading = (state) => state.tables.loading;
export const getTablesError = (state) => state.tables.error;

export const getTableById = (state, id) =>
  state.tables.data.find((table) => table.id === Number(id));