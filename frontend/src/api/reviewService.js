import api from './axios';

export const reviewService = {
  canReview: async (reservationId, userId) => {
    const response = await api.get('/reviews/can-review', {
      params: { reservationId, userId }
    });
    return response.data;
  },

  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  getAllReviews: async (filters = {}) => {
    const response = await api.get('/reviews', { params: filters });
    return response.data;
  },

  getReviewById: async (id) => {
    const response = await api.get(`/reviews/${id}`);
    return response.data;
  },

  updateReviewStatus: async (id, status) => {
    const response = await api.put(`/reviews/${id}/status`, { status });
    return response.data;
  },

  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  }
};
