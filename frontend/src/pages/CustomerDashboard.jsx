import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import { Calendar, Clock, Users, CheckCircle, ArrowLeft } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const response = await reservationService.getAllReservations({ userId: user._id });
      setReservations(response.data || []);
    } catch (error) {
      console.error('Error fetching customer reservations:', error);
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
                <ArrowLeft size={16} className="rotate-180" />
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
    </div>
  );
};

export default CustomerDashboard;
