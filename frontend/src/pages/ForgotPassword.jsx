import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../api/authService';
import { UtensilsCrossed, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (error) setError('');
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.forgotPassword(email);
      setSuccess(true);
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen restaurant-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')] bg-cover bg-center opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700/30 backdrop-blur-sm rounded-full mb-5 border border-amber-600/30">
            <UtensilsCrossed size={28} className="text-amber-400" />
          </div>
          <h1 className="font-serif text-4xl font-semibold text-white mb-2 tracking-wide">
            La Maison
          </h1>
          <p className="text-amber-200/70 text-sm tracking-widest uppercase">
            Fine Dining & Reservations
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          {!success ? (
            <>
              <h2 className="font-serif text-2xl font-medium text-stone-800 mb-1 text-center">
                Forgot Password
              </h2>
              <p className="text-stone-500 text-sm text-center mb-6">
                Enter your email and we'll help you reset your password
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-stone-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                    className="input-restaurant"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 text-center"
                >
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-medium text-stone-800 mb-2">
                  Check Your Email
                </h2>
                <p className="text-stone-500 text-sm">
                  If an account exists for this email, you will receive reset instructions.
                </p>
              </div>

              {resetToken && (
                <div className="mb-6">
                  <Link
                    to={`/reset-password?token=${resetToken}`}
                    className="block w-full btn-primary text-center"
                  >
                    Reset Password Now
                  </Link>
                </div>
              )}
            </>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 font-semibold hover:underline">
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
