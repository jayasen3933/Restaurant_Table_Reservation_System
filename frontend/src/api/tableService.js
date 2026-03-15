import api from './axios';

export const tableService = {
  getAllTables: async () => {
    const response = await api.get('/tables');
    return response.data;
  },

  createTable: async (tableData) => {
    const response = await api.post('/tables', tableData);
    return response.data;
  },

  updateTableStatus: async (id, status) => {
    const response = await api.put(`/tables/${id}`, { status });
    return response.data;
  },

  deleteTable: async (id) => {
    const response = await api.delete(`/tables/${id}`);
    return response.data;
  }
};
