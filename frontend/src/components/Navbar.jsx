import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Settings, BarChart3 } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
          >
            Restaurant Reservations
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Calendar size={16} />
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/analytics"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <BarChart3 size={16} />
                      Analytics
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User size={16} />
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
