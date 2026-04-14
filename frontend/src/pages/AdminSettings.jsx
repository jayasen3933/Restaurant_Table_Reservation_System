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
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-8">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl font-semibold text-white mb-2">
            Admin Settings
          </h1>
          <p className="text-stone-400">
            Manage tables, users, and system settings
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8">

        <div className="mb-6 border-b border-stone-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('tables')}
              className={`pb-4 px-2 text-sm font-medium transition-colors ${
                activeTab === 'tables'
                  ? 'border-b-2 border-amber-700 text-amber-800'
                  : 'text-stone-500 hover:text-stone-800'
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
                  ? 'border-b-2 border-amber-700 text-amber-800'
                  : 'text-stone-500 hover:text-stone-800'
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
              <h2 className="font-serif text-2xl font-semibold text-stone-800">Table Management</h2>
              <button
                onClick={() => setShowAddTable(!showAddTable)}
                className="flex items-center gap-2 btn-primary text-sm"
              >
                <Plus size={16} />
                Add Table
              </button>
            </div>

            {showAddTable && (
              <div className="mb-6 p-6 glass-card rounded-2xl">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">Add New Table</h3>
                <form onSubmit={handleAddTable} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Table Number
                    </label>
                    <input
                      type="number"
                      value={newTable.tableNumber}
                      onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                      required
                      min="1"
                      className="input-restaurant !py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1.5">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                      required
                      min="1"
                      max="12"
                      className="input-restaurant !py-2"
                    />
                  </div>
                  <div className="col-span-2 flex gap-4">
                    <button type="submit" className="flex-1 btn-primary text-center text-sm py-2">
                      Add Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddTable(false)}
                      className="flex-1 btn-secondary text-center text-sm py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <p className="text-stone-500">Loading tables...</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-100 border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Table Number</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-100">
                    {tables.map((table) => (
                      <tr key={table._id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-stone-800">
                          Table {table.tableNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-stone-600">
                          {table.capacity} guests
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteTable(table._id)}
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
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-semibold text-stone-800">User Management</h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-stone-500">Loading users...</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-stone-100 border-b border-stone-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-stone-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-stone-100">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-stone-800">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-stone-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                            className={`px-3 py-1 text-xs rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/40 ${
                              user.role === 'admin'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }`}
                          >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-stone-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
