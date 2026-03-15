import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import { userService } from '../api/userService';
import { tableService } from '../api/tableService';
import { TrendingUp, Users, Calendar, Table } from 'lucide-react';

const AdminAnalytics = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalReservations: 0,
    todayReservations: 0,
    totalUsers: 0,
    totalTables: 0,
    statusBreakdown: {
      pending: 0,
      confirmed: 0,
      seated: 0,
      completed: 0,
      cancelled: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const [allReservations, todayReservations, users, tables] = await Promise.all([
        reservationService.getAllReservations(),
        reservationService.getAllReservations({ date: new Date().toISOString().split('T')[0] }),
        userService.getStats(),
        tableService.getAllTables()
      ]);

      const statusBreakdown = {
        pending: 0,
        confirmed: 0,
        seated: 0,
        completed: 0,
        cancelled: 0
      };

      allReservations.data.forEach(reservation => {
        statusBreakdown[reservation.status]++;
      });

      setStats({
        totalReservations: allReservations.count,
        todayReservations: todayReservations.count,
        totalUsers: users.data.totalUsers,
        totalTables: tables.count,
        statusBreakdown
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-900 mb-2">
            Analytics & Insights
          </h1>
          <p className="text-gray-600">
            Overview of your restaurant's performance
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Reservations</h3>
                <p className="text-3xl font-medium text-gray-900">{stats.totalReservations}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Today's Reservations</h3>
                <p className="text-3xl font-medium text-gray-900">{stats.todayReservations}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-600" size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Users</h3>
                <p className="text-3xl font-medium text-gray-900">{stats.totalUsers}</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Table className="text-orange-600" size={24} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Tables</h3>
                <p className="text-3xl font-medium text-gray-900">{stats.totalTables}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Reservation Status Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700 font-medium mb-1">Pending</p>
                  <p className="text-2xl font-medium text-yellow-900">{stats.statusBreakdown.pending}</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium mb-1">Confirmed</p>
                  <p className="text-2xl font-medium text-blue-900">{stats.statusBreakdown.confirmed}</p>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium mb-1">Seated</p>
                  <p className="text-2xl font-medium text-purple-900">{stats.statusBreakdown.seated}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700 font-medium mb-1">Completed</p>
                  <p className="text-2xl font-medium text-green-900">{stats.statusBreakdown.completed}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium mb-1">Cancelled</p>
                  <p className="text-2xl font-medium text-red-900">{stats.statusBreakdown.cancelled}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Insights</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  • <strong>Occupancy Rate:</strong> {stats.totalReservations > 0 
                    ? `${Math.round((stats.statusBreakdown.confirmed + stats.statusBreakdown.seated) / stats.totalReservations * 100)}%`
                    : '0%'} of reservations are active
                </p>
                <p>
                  • <strong>Completion Rate:</strong> {stats.totalReservations > 0
                    ? `${Math.round(stats.statusBreakdown.completed / stats.totalReservations * 100)}%`
                    : '0%'} of reservations completed successfully
                </p>
                <p>
                  • <strong>Cancellation Rate:</strong> {stats.totalReservations > 0
                    ? `${Math.round(stats.statusBreakdown.cancelled / stats.totalReservations * 100)}%`
                    : '0%'} of reservations were cancelled
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
