import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import { Calendar, Clock, Users, CheckCircle, UtensilsCrossed } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchParams = location.state;

  const [availableTables, setAvailableTables] = useState([]);
  const [allTables, setAllTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    customerName: '',
    email: '',
    phone: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(4);
  const [slotMessage, setSlotMessage] = useState('');

  useEffect(() => {
    if (!searchParams?.date || !searchParams?.time || !searchParams?.partySize) {
      navigate('/');
      return;
    }
    fetchAvailableTables();
  }, []);

  const fetchAvailableTables = async () => {
    try {
      setLoading(true);
      const response = await reservationService.checkAvailability(
        searchParams.date,
        searchParams.time,
        searchParams.partySize
      );
      setAvailableTables(response.data);
      setAllTables(response.allTables || []);
      setRemainingSlots(response.remainingSlots || 0);
      setSlotMessage(response.message || '');
    } catch (error) {
      console.error('Error fetching available tables:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowContactForm(true);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for phone number
    if (name === 'phone') {
      // Remove all non-numeric characters
      const numericValue = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedValue = numericValue.slice(0, 10);
      
      setContactInfo({
        ...contactInfo,
        [name]: limitedValue
      });
      
      // Validate phone number
      if (limitedValue.length > 0 && limitedValue.length < 10) {
        setPhoneError('Please enter a valid 10-digit mobile number');
      } else if (limitedValue.length === 10) {
        setPhoneError('');
      } else {
        setPhoneError('');
      }
    } else {
      setContactInfo({
        ...contactInfo,
        [name]: value
      });
    }
  };
  
  const handlePhoneBlur = () => {
    if (contactInfo.phone.length > 0 && contactInfo.phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (contactInfo.phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    try {
      // Get userId - backend returns 'id', not '_id'
      const userId = user?.id || user?._id;
      
      console.log('Creating reservation with userId:', userId);
      console.log('User object:', user);
      
      await reservationService.createReservation({
        ...contactInfo,
        date: searchParams.date,
        time: searchParams.time,
        partySize: parseInt(searchParams.partySize),
        tableId: selectedTable._id,
        userId: userId || null
      });
      setBookingSuccess(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Failed to create reservation');
    }
  };

  // Redirect to My Reservations after successful booking
  useEffect(() => {
    if (bookingSuccess) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [bookingSuccess, navigate]);

  if (!searchParams) {
    return null;
  }

  if (bookingSuccess) {

    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-stone-900/85" />
        <div className="max-w-md mx-auto text-center p-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600/20 backdrop-blur-sm rounded-full mb-6 border border-emerald-500/30">
            <CheckCircle size={40} className="text-emerald-400" />
          </div>
          <h2 className="font-serif text-4xl font-semibold text-white mb-4">
            Reservation Confirmed!
          </h2>
          <p className="text-stone-300 mb-6 leading-relaxed">
            Your table has been reserved for <span className="text-amber-400 font-medium">{searchParams.date}</span> at <span className="text-amber-400 font-medium">{searchParams.time}</span>.
            A confirmation will be sent to <span className="text-amber-400 font-medium">{contactInfo.email}</span>.
          </p>
          <p className="text-stone-400 text-sm">
            Redirecting to My Reservations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden w-full max-w-[100vw]">
      <div className="bg-stone-900 py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 md:mb-4">
              Available Tables
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
              <div className="flex items-center gap-2 text-amber-300">
                <Calendar size={16} />
                {new Date(searchParams.date + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Clock size={16} />
                {searchParams.time}
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Users size={16} />
                {searchParams.partySize} {searchParams.partySize === '1' ? 'Guest' : 'Guests'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-full">
        <div className="max-w-4xl mx-auto w-full">
          {!loading && remainingSlots > 0 && remainingSlots < 4 && availableTables.length > 0 && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-sm text-amber-800 font-medium">
                Hurry! Only {availableTables.length} {availableTables.length === 1 ? 'table' : 'tables'} left for this time slot!
              </p>
              <p className="text-xs text-amber-700 mt-1">
                ({remainingSlots} more {remainingSlots === 1 ? 'reservation' : 'reservations'} can be made - max 4 per timeslot)
              </p>
            </div>
          )}

          {slotMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-800">{slotMessage}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <UtensilsCrossed size={32} className="mx-auto text-amber-600 mb-3 animate-pulse" />
              <p className="text-stone-500">Finding the perfect table for you...</p>
            </div>
          ) : availableTables.length === 0 && !slotMessage ? (
            <div className="text-center py-16 glass-card rounded-2xl">
              <p className="text-stone-600 mb-3 text-lg font-medium">
                No tables available for the selected date and time.
              </p>
              <p className="text-sm text-stone-500 mb-6 max-w-md mx-auto">
                {remainingSlots > 0 
                  ? `This timeslot can still accept ${remainingSlots} more reservations, but all suitable tables are currently booked.`
                  : 'This timeslot is fully booked (maximum 4 reservations reached).'}
              </p>
              <button onClick={() => navigate('/')} className="btn-primary text-center">
                Try Different Date/Time
              </button>
            </div>
          ) : availableTables.length === 0 && slotMessage ? null : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {!showContactForm ? (
                allTables.map((table) => {
                  const isAvailable = availableTables.some(t => t._id === table._id);
                  return (
                    <div
                      key={table._id}
                      className={`glass-card rounded-xl md:rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all ${
                        isAvailable 
                          ? 'hover:border-amber-300 cursor-pointer group' 
                          : 'opacity-60 border-stone-300 cursor-not-allowed'
                      }`}
                      onClick={() => isAvailable && handleTableSelect(table)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className={`font-serif text-lg md:text-xl font-semibold transition-colors ${
                            isAvailable 
                              ? 'text-stone-800 group-hover:text-amber-800' 
                              : 'text-stone-500'
                          }`}>
                            Table {table.tableNumber}
                          </h3>
                          <p className="text-sm text-stone-500 mt-1">
                            Seats up to {table.capacity} guests
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full border font-medium ${
                          isAvailable 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {isAvailable ? 'Available' : 'Reserved'}
                        </span>
                      </div>
                      <button 
                        className={`w-full text-center text-sm py-2.5 rounded-lg transition-all ${
                          isAvailable 
                            ? 'btn-primary' 
                            : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        }`}
                        disabled={!isAvailable}
                      >
                        {isAvailable ? 'Select This Table' : 'Reserved'}
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-1 md:col-span-2">
                  <div className="glass-card rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8">
                    <div className="mb-4 md:mb-6">
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-stone-800 mb-2">
                        Complete Your Reservation
                      </h2>
                      <p className="text-sm text-stone-500">
                        Table {selectedTable.tableNumber} &middot; Seats {selectedTable.capacity} guests
                      </p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={contactInfo.customerName}
                          onChange={handleContactChange}
                          required
                          className="input-restaurant"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactInfo.email}
                          onChange={handleContactChange}
                          required
                          className="input-restaurant"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-600 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactInfo.phone}
                          onChange={handleContactChange}
                          onBlur={handlePhoneBlur}
                          maxLength={10}
                          required
                          className={`input-restaurant ${phoneError ? 'border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="10-digit mobile number"
                        />
                        {phoneError && (
                          <p className="text-red-600 text-sm mt-1 font-medium">{phoneError}</p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="w-full sm:flex-1 btn-secondary text-center py-3"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-full sm:flex-1 btn-primary text-center py-3"
                        >
                          Confirm Reservation
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
