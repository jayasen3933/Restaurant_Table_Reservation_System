import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Edit2, Save, X, Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to set new password';
      }
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'New password must be at least 6 characters';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await api.put('/auth/update-profile', updateData);
      
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Profile updated successfully!');
        setIsEditing(false);
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        window.location.reload();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900">
      <div className="bg-stone-900 py-8">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl font-semibold text-white mb-2">
            My Profile
          </h1>
          <p className="text-stone-400">
            View and manage your account information
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-stone-800/50 backdrop-blur-sm border border-stone-700 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl font-semibold text-white">
                Account Details
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-stone-300 mb-2">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 bg-stone-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-stone-600'
                  } rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-stone-300 mb-2">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 bg-stone-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-stone-600'
                  } rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-stone-300 mb-2">
                  <Shield size={18} />
                  Role
                </label>
                <div className="px-4 py-3 bg-stone-900/30 border border-stone-700 rounded-lg">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    user.role === 'admin' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {user.role === 'admin' ? 'Administrator' : 'Customer'}
                  </span>
                </div>
              </div>

              {isEditing && (
                <>
                  <div className="border-t border-stone-700 pt-6 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Change Password (Optional)
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-stone-300 mb-2 block">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 bg-stone-900/50 border ${
                              errors.currentPassword ? 'border-red-500' : 'border-stone-600'
                            } rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-300"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.currentPassword && (
                          <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-stone-300 mb-2 block">
                          New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-stone-900/50 border ${
                            errors.newPassword ? 'border-red-500' : 'border-stone-600'
                          } rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                          placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                          <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-stone-300 mb-2 block">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 bg-stone-900/50 border ${
                            errors.confirmPassword ? 'border-red-500' : 'border-stone-600'
                          } rounded-lg text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500`}
                          placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={18} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-stone-700 text-white rounded-lg hover:bg-stone-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
