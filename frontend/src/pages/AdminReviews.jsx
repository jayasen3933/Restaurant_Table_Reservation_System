import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reviewService } from '../api/reviewService';
import { Star, Calendar, User, MessageSquare, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const AdminReviews = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }
    fetchReviews();
  }, [isAuthenticated, isAdmin, filter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await reviewService.getAllReviews(params);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await reviewService.updateReviewStatus(id, status);
      fetchReviews();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update review status');
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.deleteReview(id);
        fetchReviews();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete review');
      }
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      food: 'Food Quality',
      service: 'Service',
      ambiance: 'Ambiance',
      cleanliness: 'Cleanliness',
      overall: 'Overall Experience'
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-700/30 backdrop-blur-sm rounded-full mb-6 border border-amber-600/30">
            <Star size={32} className="text-amber-600 animate-spin" />
          </div>
          <p className="text-stone-500">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-8">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl font-semibold text-white mb-2">
            Customer Reviews
          </h1>
          <p className="text-stone-400">
            Manage and moderate customer feedback
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            All Reviews
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rejected'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            Rejected
          </button>
        </div>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center">
            <Star size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
              No Reviews Found
            </h3>
            <p className="text-stone-500">
              {filter === 'all' 
                ? 'No customer reviews yet.' 
                : `No ${filter} reviews.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <User size={24} className="text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-stone-800">
                        {review.customerName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={
                                star <= review.rating
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-stone-300'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm text-stone-500">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.status !== 'pending' && (
                    <span className={`px-3 py-1 text-xs rounded-full border font-medium ${getStatusColor(review.status)}`}>
                      {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      {getCategoryLabel(review.category)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">
                    {review.comment}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-stone-200">
                  {review.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'approved')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle size={14} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(review._id, 'rejected')}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle size={14} />
                        Reject
                      </button>
                    </>
                  )}
                  {review.status === 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(review._id, 'rejected')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  )}
                  {review.status === 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(review._id, 'approved')}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle size={14} />
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="ml-auto flex items-center gap-1 px-3 py-1.5 text-stone-400 hover:text-red-600 text-sm transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
