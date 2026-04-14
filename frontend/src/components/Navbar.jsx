import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar, Settings, BarChart3, UtensilsCrossed, Star } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-stone-900 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <UtensilsCrossed size={22} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
            <span className="font-serif text-xl font-semibold text-white tracking-wide group-hover:text-amber-100 transition-colors">
              La Maison
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                    >
                      <Calendar size={15} />
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/analytics"
                      className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                    >
                      <BarChart3 size={15} />
                      Analytics
                    </Link>
                    <Link
                      to="/admin/reviews"
                      className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                    >
                      <Star size={15} />
                      Reviews
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                    >
                      <Settings size={15} />
                      Settings
                    </Link>
                    <div className="w-px h-6 bg-stone-700 mx-2" />
                  </>
                )}
                {!isAdmin && (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-sm text-stone-300 hover:text-amber-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                  >
                    <Calendar size={15} />
                    My Reservations
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-amber-200 px-3 py-2">
                  <User size={15} />
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-stone-400 hover:text-red-400 hover:bg-stone-800 px-3 py-2 rounded-lg transition-all"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-sm px-5 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-all font-medium shadow-md"
                >
                  Sign Up
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
