import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { reservationService } from '../api/reservationService';
import { Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state;

  const [availableTables, setAvailableTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    customerName: '',
    email: '',
    phone: ''
  });
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
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await reservationService.createReservation({
        ...contactInfo,
        date: searchParams.date,
        time: searchParams.time,
        partySize: parseInt(searchParams.partySize),
        tableId: selectedTable._id
      });
      setBookingSuccess(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create reservation');
    }
  };

  if (!searchParams) {
    return null;
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <CheckCircle size={64} className="mx-auto text-green-600 mb-4" />
          <h2 className="text-3xl font-medium text-gray-900 mb-4">
            Reservation Confirmed!
          </h2>
          <p className="text-gray-600 mb-6">
            Your table has been reserved for {searchParams.date} at {searchParams.time}.
            A confirmation email has been sent to {contactInfo.email}.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              Available Tables
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(searchParams.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {searchParams.time}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                {searchParams.partySize} {searchParams.partySize === '1' ? 'Guest' : 'Guests'}
              </div>
            </div>
          </div>

          {!loading && remainingSlots > 0 && remainingSlots < 4 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Only {remainingSlots} {remainingSlots === 1 ? 'slot' : 'slots'} remaining for this time! Book now before it fills up.
              </p>
            </div>
          )}

          {slotMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                {slotMessage}
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading available tables...</p>
            </div>
          ) : availableTables.length === 0 ? (
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <p className="text-gray-600 mb-4">
                No tables available for the selected date and time.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Try Different Date/Time
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!showContactForm ? (
                availableTables.map((table) => (
                  <div
                    key={table._id}
                    className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => handleTableSelect(table)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">
                          Table {table.tableNumber}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Capacity: {table.capacity} guests
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full border border-green-200">
                        Available
                      </span>
                    </div>
                    <button className="w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm">
                      Select This Table
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-2">
                  <div className="border border-gray-200 rounded-lg p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-medium text-gray-900 mb-2">
                        Complete Your Reservation
                      </h2>
                      <p className="text-sm text-gray-600">
                        Table {selectedTable.tableNumber} - Capacity: {selectedTable.capacity} guests
                      </p>
                    </div>

                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={contactInfo.customerName}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactInfo.email}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactInfo.phone}
                          onChange={handleContactChange}
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
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
