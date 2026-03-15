import api from './axios';

export const reservationService = {
  checkAvailability: async (date, time, partySize) => {
    const response = await api.get('/reservations/check-availability', {
      params: { date, time, partySize }
    });
    return response.data;
  },

  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  getAllReservations: async (filters = {}) => {
    const response = await api.get('/reservations', { params: filters });
    return response.data;
  },

  getReservationById: async (id) => {
    const response = await api.get(`/reservations/${id}`);
    return response.data;
  },

  updateReservationStatus: async (id, status) => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },

  deleteReservation: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  }
};
