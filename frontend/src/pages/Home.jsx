import { useState, useMemo } from 'react';
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

  // Generate time slots dynamically based on selected date with IST timezone validation
  const generateTimeSlots = (dateString) => {
    if (!dateString) return [];
    
    const selectedDate = new Date(dateString);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Get current time in IST (Asia/Kolkata)
    const now = new Date();
    const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const currentHour = istTime.getHours();
    const currentMinutes = istTime.getMinutes();
    
    // Check if selected date is today (in IST)
    const istToday = new Date(istTime.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata' }));
    const selectedDateOnly = new Date(selectedDate.toLocaleDateString());
    const isToday = istToday.getTime() === selectedDateOnly.getTime();
    
    // Check if weekend (Saturday = 6, Sunday = 0)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const slots = [];
    let startHour, endHour;
    
    if (isWeekend) {
      // Weekend: 10:00 AM to 11:00 PM
      startHour = 10;
      endHour = 23;
    } else {
      // Weekday: 11:00 AM to 10:00 PM
      startHour = 11;
      endHour = 22;
    }
    
    // Generate 30-minute intervals
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes of [0, 30]) {
        // Skip the last 30-minute slot if it exceeds end time
        if (hour === endHour && minutes === 30) continue;
        
        // If today, skip past time slots (IST)
        if (isToday) {
          if (hour < currentHour || (hour === currentHour && minutes <= currentMinutes)) {
            continue;
          }
        }
        
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const displayMinutes = minutes === 0 ? '00' : minutes;
        
        slots.push(`${displayHour}:${displayMinutes} ${period}`);
      }
    }
    
    return slots;
  };

  // Memoize time slots based on selected date
  const timeSlots = useMemo(() => {
    return generateTimeSlots(formData.date);
  }, [formData.date]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/60 to-stone-900/90" />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-full">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-amber-700/30 backdrop-blur-sm rounded-full border border-amber-600/20 mb-4 md:mb-6">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-amber-200 text-xs tracking-widest uppercase font-medium">Now Taking Reservations</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight px-2">
              Reserve Your
              <br />
              <span className="text-amber-400 italic">Perfect Table</span>
            </h1>
            <p className="text-base md:text-lg text-stone-300 max-w-md mx-auto px-4">
              Select your preferred date, time, and party size to discover available tables
            </p>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-full">
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

          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-8 text-stone-400 text-xs tracking-wider uppercase px-4">
            <span>Award Winning Cuisine</span>
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            <span>Premium Ambiance</span>
            <span className="w-1 h-1 rounded-full bg-amber-500 hidden sm:block" />
            <span className="hidden sm:inline">Fine Dining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
