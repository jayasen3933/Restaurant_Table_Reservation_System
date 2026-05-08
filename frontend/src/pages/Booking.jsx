import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reservationService } from '../api/reservationService';
import { Calendar, Clock, Users, CheckCircle, UtensilsCrossed, Sparkles } from 'lucide-react';
import { getTableInfo } from '../data/tableData';

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
    <div className="min-h-screen relative overflow-x-hidden w-full max-w-[100vw]">
      {/* Warm Theme Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-40 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
      
      <div className="relative bg-stone-900 py-6 md:py-10">
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
                  const tableInfo = getTableInfo(table.tableNumber);
                  return (
                    <div
                      key={table._id}
                      className={`relative backdrop-blur-xl bg-white/80 border border-amber-200/30 rounded-xl md:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        isAvailable 
                          ? 'hover:border-amber-400/50 hover:bg-white/90 cursor-pointer group' 
                          : 'opacity-60 border-stone-300 cursor-not-allowed'
                      }`}
                      onClick={() => isAvailable && handleTableSelect(table)}
                    >
                      {/* Frosted Glass Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-orange-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-inset ring-amber-300/20 group-hover:ring-amber-400/40 transition-all duration-300"></div>
                      {/* Table Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={tableInfo.image}
                          alt={tableInfo.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = tableInfo.fallbackImage || 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Status Badge */}
                        <span className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full border font-medium backdrop-blur-sm ${
                          isAvailable 
                            ? 'bg-emerald-600/80 text-white border-emerald-400/50' 
                            : 'bg-red-600/80 text-white border-red-400/50'
                        }`}>
                          {isAvailable ? 'Available' : 'Reserved'}
                        </span>
                        
                        {/* Capacity Badge */}
                        <div className="absolute bottom-4 left-4 backdrop-blur-md bg-stone-900/60 text-white px-3 py-1.5 rounded-lg text-sm font-semibold border border-white/20">
                          <Users size={14} className="inline mr-1.5" />
                          {tableInfo.capacity} Capacity
                        </div>
                      </div>

                      {/* Table Info */}
                      <div className="relative p-4 md:p-6 bg-gradient-to-b from-white/50 to-white/30 backdrop-blur-sm">
                        <div className="mb-3">
                          <h3 className={`font-serif text-lg md:text-xl font-semibold transition-colors mb-1 drop-shadow-sm ${
                            isAvailable 
                              ? 'text-amber-900 group-hover:text-amber-700' 
                              : 'text-stone-500'
                          }`}>
                            Table {table.tableNumber}: {tableInfo.title}
                          </h3>
                          <p className="text-xs text-amber-700/70 font-medium">
                            Seats up to {table.capacity} guests
                          </p>
                        </div>
                        
                        {/* Description */}
                        <p className="text-sm text-stone-700 mb-4 line-clamp-3 leading-relaxed">
                          {tableInfo.description}
                        </p>
                        
                        {/* Features */}
                        {tableInfo.features && tableInfo.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tableInfo.features.map((feature, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 text-xs bg-amber-100/80 text-amber-800 px-2.5 py-1 rounded-full border border-amber-300/50 backdrop-blur-sm shadow-sm">
                                <Sparkles size={10} className="text-amber-600" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
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
                    </div>
                  );
                })
              ) : (
                <div className="col-span-1 md:col-span-2">
                  <div className="relative backdrop-blur-xl bg-white/80 border border-amber-200/30 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                    {/* Frosted Glass Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-orange-50/20 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 rounded-xl md:rounded-2xl ring-1 ring-inset ring-amber-300/30"></div>
                    {/* Selected Table Preview */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getTableInfo(selectedTable.tableNumber).image}
                        alt={getTableInfo(selectedTable.tableNumber).title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const fallback = getTableInfo(selectedTable.tableNumber).fallbackImage;
                          e.target.src = fallback || 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                          Table {selectedTable.tableNumber}: {getTableInfo(selectedTable.tableNumber).title}
                        </h2>
                        <p className="text-sm text-white/90">
                          {getTableInfo(selectedTable.tableNumber).description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="mb-4 md:mb-6">
                        <h3 className="font-serif text-xl font-semibold text-stone-800 mb-2">
                          Complete Your Reservation
                        </h3>
                        <p className="text-sm text-stone-500">
                          Capacity: {getTableInfo(selectedTable.tableNumber).capacity} &middot; Seats {selectedTable.capacity} guests
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
