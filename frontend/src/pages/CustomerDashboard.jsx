import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import { reviewService } from '../api/reviewService';
import { Calendar, Clock, Users, CheckCircle, RefreshCw, Star, MessageSquare, Phone } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    category: 'overall',
    comment: ''
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    fetchCustomerReservations();
  }, [isAuthenticated, user]);

  const fetchCustomerReservations = async () => {
    try {
      setLoading(true);
      // Use user.id (backend returns 'id', not '_id')
      const userId = user?.id || user?._id;
      
      console.log('=== Fetching Reservations ===');
      console.log('User object:', user);
      console.log('Extracted userId:', userId);
      
      if (!userId) {
        console.error('No user ID found');
        setReservations([]);
        setLoading(false);
        return;
      }
      
      console.log('Calling API with userId:', userId);
      const response = await reservationService.getAllReservations({ userId });
      
      console.log('API Response:', response);
      console.log('Reservations data:', response.data);
      console.log('Number of reservations:', response.data?.length || 0);
      
      setReservations(response.data || []);
    } catch (error) {
      console.error('Error fetching customer reservations:', error);
      console.error('Error details:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
      seated: 'bg-purple-50 text-purple-700 border-purple-200',
      completed: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const isUpcoming = (reservation) => {
    const reservationDate = new Date(reservation.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return reservationDate >= now && reservation.status !== 'cancelled' && reservation.status !== 'completed';
  };

  const handleOpenReviewModal = (reservation) => {
    setSelectedReservation(reservation);
    setShowReviewModal(true);
    setReviewData({ rating: 5, category: 'overall', comment: '' });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    // Get fresh user data from localStorage
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    
    // Check for user ID (could be _id or id)
    const userId = currentUser?._id || currentUser?.id || user?._id || user?.id;
    const userName = currentUser?.name || user?.name || 'Anonymous';
    
    if (!userId) {
      alert('User session expired. Please login again.');
      navigate('/login');
      return;
    }

    try {
      const reviewPayload = {
        reservationId: selectedReservation._id,
        userId: userId,
        customerName: userName,
        rating: reviewData.rating,
        category: reviewData.category,
        comment: reviewData.comment
      };
      
      console.log('Submitting review with payload:', reviewPayload);
      
      await reviewService.createReview(reviewPayload);
      alert('Thank you for your review!');
      setShowReviewModal(false);
      setSelectedReservation(null);
      setReviewData({ rating: 5, category: 'overall', comment: '' });
    } catch (error) {
      console.error('Review submission error:', error);
      console.error('Error details:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const upcomingBookings = reservations.filter(isUpcoming);
  const bookingHistory = reservations.filter(r => !isUpcoming(r));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700/30 backdrop-blur-sm rounded-full mb-6 border border-amber-600/30">
            <Calendar size={32} className="text-amber-600 animate-spin" />
          </div>
          <p className="text-stone-500">Loading your reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl font-semibold text-white mb-2">
                My Reservations
              </h1>
              <p className="text-stone-400">
                Manage your restaurant bookings
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/support')}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 font-medium"
              >
                <Phone size={16} />
                Support
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-all flex items-center gap-2 font-medium"
              >
                <Calendar size={16} />
                Make a Reservation
              </button>
              <button
                onClick={fetchCustomerReservations}
                className="px-4 py-2 border border-stone-600 text-stone-300 rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {reservations.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
              <Calendar size={40} className="text-amber-600" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-stone-800 mb-4">
              No Reservations Yet
            </h2>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">
              You haven't made any reservations yet. Ready to book your first table?
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary text-center"
            >
              Make Your First Reservation
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current/Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="border-b border-stone-200 bg-stone-50 px-6 py-4">
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                    Current/Upcoming Bookings
                  </h2>
                  <p className="text-sm text-stone-500">
                    Your active and upcoming reservations
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-100 border-b border-stone-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Table</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Guests</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                      {upcomingBookings.map((reservation) => (
                        <tr key={reservation._id} className="hover:bg-amber-50/40 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm font-medium text-stone-800">
                              <Calendar size={14} className="text-amber-600" />
                              {formatDate(reservation.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-stone-700">
                              <Clock size={14} className="text-amber-600" />
                              {reservation.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-stone-700">
                              Table {reservation.tableId?.tableNumber || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-stone-700">
                              <Users size={14} className="text-stone-400" />
                              {reservation.partySize}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusColor(reservation.status)}`}>
                              {reservation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Booking History */}
            {bookingHistory.length > 0 && (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="border-b border-stone-200 bg-stone-50 px-6 py-4">
                  <h2 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                    Past Bookings
                  </h2>
                  <p className="text-sm text-stone-500">
                    Your completed, cancelled, and past reservations
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-100 border-b border-stone-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Table</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Guests</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                      {bookingHistory.map((reservation) => (
                        <tr key={reservation._id} className="hover:bg-amber-50/40 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm font-medium text-stone-800">
                              <Calendar size={14} className="text-amber-600" />
                              {formatDate(reservation.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-stone-700">
                              <Clock size={14} className="text-amber-600" />
                              {reservation.time}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-stone-700">
                              Table {reservation.tableId?.tableNumber || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2 text-sm text-stone-700">
                              <Users size={14} className="text-stone-400" />
                              {reservation.partySize}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusColor(reservation.status)}`}>
                              {reservation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {reservation.status === 'completed' && (
                              <button
                                onClick={() => handleOpenReviewModal(reservation)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors"
                              >
                                <Star size={14} />
                                Leave Review
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="font-serif text-2xl font-semibold text-stone-800 mb-4">
              Leave a Review
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Share your experience for your reservation on {formatDate(selectedReservation.date)}
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={star <= reviewData.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Category
                </label>
                <select
                  value={reviewData.category}
                  onChange={(e) => setReviewData({ ...reviewData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="overall">Overall Experience</option>
                  <option value="food">Food Quality & Taste</option>
                  <option value="service">Service & Staff Behavior</option>
                  <option value="ambiance">Ambiance & Atmosphere</option>
                  <option value="cleanliness">Cleanliness & Hygiene</option>
                </select>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Tell us about your experience..."
                  required
                  maxLength={500}
                />
                <p className="text-xs text-stone-400 mt-1">
                  {reviewData.comment.length}/500 characters
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewModal(false);
                    setSelectedReservation(null);
                  }}
                  className="flex-1 px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
