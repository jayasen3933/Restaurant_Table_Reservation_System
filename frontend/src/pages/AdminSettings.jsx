import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tableService } from '../api/tableService';
import { userService } from '../api/userService';
import { Plus, Trash2, Edit, Users as UsersIcon, Table as TableIcon } from 'lucide-react';

const AdminSettings = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('tables');
  const [tables, setTables] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState({ tableNumber: '', capacity: '' });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'tables') {
        const response = await tableService.getAllTables();
        setTables(response.data);
      } else {
        const response = await userService.getAllUsers();
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      await tableService.createTable({
        tableNumber: parseInt(newTable.tableNumber),
        capacity: parseInt(newTable.capacity)
      });
      setNewTable({ tableNumber: '', capacity: '' });
      setShowAddTable(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add table');
    }
  };

  const handleDeleteTable = async (id) => {
    if (window.confirm('Are you sure you want to delete this table?')) {
      try {
        await tableService.deleteTable(id);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete table');
      }
    }
  };

  const handleUpdateTableStatus = async (id, status) => {
    try {
      await tableService.updateTableStatus(id, status);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update table status');
    }
  };

  const handleUpdateUserRole = async (id, role) => {
    try {
      await userService.updateUserRole(id, role);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-gray-900 mb-2">
            Admin Settings
          </h1>
          <p className="text-gray-600">
            Manage tables, users, and system settings
          </p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('tables')}
              className={`pb-4 px-2 text-sm font-medium transition-colors ${
                activeTab === 'tables'
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TableIcon size={16} />
                Tables
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-4 px-2 text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'border-b-2 border-gray-900 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <UsersIcon size={16} />
                Users
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'tables' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-medium text-gray-900">Table Management</h2>
              <button
                onClick={() => setShowAddTable(!showAddTable)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <Plus size={16} />
                Add Table
              </button>
            </div>

            {showAddTable && (
              <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Table</h3>
                <form onSubmit={handleAddTable} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Table Number
                    </label>
                    <input
                      type="number"
                      value={newTable.tableNumber}
                      onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                      required
                      min="1"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                      required
                      min="1"
                      max="12"
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div className="col-span-2 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Add Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddTable(false)}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading tables...</p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Table Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tables.map((table) => (
                      <tr key={table._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Table {table.tableNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {table.capacity} guests
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={table.status}
                            onChange={(e) => handleUpdateTableStatus(table._id, e.target.value)}
                            className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
                              table.status === 'available'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            <option value="available">Available</option>
                            <option value="occupied">Occupied</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteTable(table._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-gray-900">User Management</h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading users...</p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                            className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
                              user.role === 'admin'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
