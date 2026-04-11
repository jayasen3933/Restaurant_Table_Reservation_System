import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import api from '../api/axios';
import { Calendar, Clock, Users, Mail, Phone, RefreshCw, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchReservations();
  }, [filterDate, showAll]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (!showAll && filterDate) {
        filters.date = filterDate;
      }
      const response = await reservationService.getAllReservations(filters);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await reservationService.updateReservationStatus(reservationId, newStatus);
      fetchReservations();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await reservationService.deleteReservation(reservationId);
        fetchReservations();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete reservation');
      }
    }
  };

  const handleCleanupDatabase = async () => {
    if (window.confirm('This will delete all users except Admin and Chada Jayasen, along with their reservations. Continue?')) {
      try {
        const response = await api.post('/users/cleanup');
        alert(`Cleanup complete!\nUsers deleted: ${response.data.details.usersDeleted}\nReservations deleted: ${response.data.details.reservationsDeleted}\nKept: ${response.data.details.keptAdmin}, ${response.data.details.keptCustomer}`);
        fetchReservations();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to cleanup database');
      }
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

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-8">
        <div className="container mx-auto px-6 flex justify-between items-start">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-white mb-2">
              Reservations Dashboard
            </h1>
            <p className="text-stone-400">
              Manage and track all restaurant reservations
            </p>
          </div>
          <button
            onClick={handleCleanupDatabase}
            className="px-4 py-2 bg-red-700/80 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Cleanup Database
          </button>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">

        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowAll(true); setFilterDate(''); }}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                showAll 
                  ? 'bg-amber-800 text-white shadow-md' 
                  : 'border border-stone-300 text-stone-600 hover:bg-stone-100'
              }`}
            >
              All Reservations
            </button>
            <button
              onClick={() => { setShowAll(false); setFilterDate(new Date().toISOString().split('T')[0]); }}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                !showAll 
                  ? 'bg-amber-800 text-white shadow-md' 
                  : 'border border-stone-300 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Filter by Date
            </button>
          </div>
          {!showAll && (
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-amber-700" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="input-restaurant !py-2"
              />
            </div>
          )}
          <button
            onClick={fetchReservations}
            className="flex items-center gap-2 px-4 py-2 border border-stone-300 text-stone-600 rounded-lg hover:bg-stone-100 transition-all"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-stone-500">Loading reservations...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-5 glass-card rounded-2xl">
              <h3 className="text-sm font-semibold text-stone-700 mb-3 uppercase tracking-wider">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                <div className="p-3 bg-stone-50 rounded-xl">
                  <p className="text-stone-500 text-xs">Total</p>
                  <p className="text-xl font-bold text-stone-800">{reservations.length}</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-xl">
                  <p className="text-yellow-600 text-xs">Pending</p>
                  <p className="text-xl font-bold text-yellow-700">
                    {reservations.filter(r => r.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl">
                  <p className="text-blue-600 text-xs">Confirmed</p>
                  <p className="text-xl font-bold text-blue-700">
                    {reservations.filter(r => r.status === 'confirmed').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl">
                  <p className="text-purple-600 text-xs">Seated</p>
                  <p className="text-xl font-bold text-purple-700">
                    {reservations.filter(r => r.status === 'seated').length}
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl">
                  <p className="text-green-600 text-xs">Completed</p>
                  <p className="text-xl font-bold text-green-700">
                    {reservations.filter(r => r.status === 'completed').length}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl">
                  <p className="text-red-600 text-xs">Cancelled</p>
                  <p className="text-xl font-bold text-red-700">
                    {reservations.filter(r => r.status === 'cancelled').length}
                  </p>
                </div>
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-12 glass-card rounded-2xl">
                <p className="text-stone-500">No reservations found.</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-100 border-b border-stone-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Customer Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Table</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Guest</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-100">
                      {reservations.map((reservation) => (
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
                            <div className="text-sm text-stone-500 space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail size={12} />
                                {reservation.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone size={12} />
                                {reservation.phone}
                              </div>
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
                            <select
                              value={reservation.status}
                              onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
                              className={`px-3 py-1 text-xs rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${getStatusColor(reservation.status)}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="seated">Seated</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteReservation(reservation._id)}
                              className="text-stone-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
