import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Sparkles } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    partySize: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.time && formData.partySize) {
      navigate('/booking', { state: formData });
    }
  };

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-700/30 backdrop-blur-sm rounded-full border border-amber-600/20 mb-6">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-amber-200 text-xs tracking-widest uppercase font-medium">Now Taking Reservations</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">
              Reserve Your
              <br />
              <span className="text-amber-400 italic">Perfect Table</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-md mx-auto">
              Select your preferred date, time, and party size to discover available tables
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-600 mb-2">
                  <Calendar size={16} className="text-amber-700" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="input-restaurant"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-600 mb-2">
                  <Clock size={16} className="text-amber-700" />
                  Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-restaurant"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-stone-600 mb-2">
                  <Users size={16} className="text-amber-700" />
                  Number of Guests
                </label>
                <select
                  name="partySize"
                  value={formData.partySize}
                  onChange={handleChange}
                  required
                  className="input-restaurant"
                >
                  <option value="">Select party size</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-center text-lg py-4"
              >
                Find Available Tables
              </button>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8 text-stone-400 text-xs tracking-wider uppercase">
            <span>Award Winning Cuisine</span>
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            <span>Premium Ambiance</span>
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            <span>Fine Dining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
