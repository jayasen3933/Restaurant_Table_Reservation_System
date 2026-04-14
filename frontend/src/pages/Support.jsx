import { Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle } from 'lucide-react';

const Support = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 py-12">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl font-semibold text-white mb-2">
            Support & Contact
          </h1>
          <p className="text-stone-400">
            We're here to help with any questions or concerns
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Phone Contact */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
                  <Phone size={24} className="text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    Call Us
                  </h3>
                  <p className="text-sm text-stone-500">Available during business hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href="tel:+916300251692" 
                  className="block text-lg text-amber-700 hover:text-amber-800 font-medium"
                >
                  +91 6300251692
                </a>
                <a 
                  href="tel:+916301716173" 
                  className="block text-lg text-amber-700 hover:text-amber-800 font-medium"
                >
                  +91 6301716173
                </a>
              </div>
            </div>

            {/* Email Contact */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail size={24} className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    Email Us
                  </h3>
                  <p className="text-sm text-stone-500">We'll respond within 24 hours</p>
                </div>
              </div>
              <div className="space-y-2">
                <a 
                  href="mailto:support@lamaison.com" 
                  className="block text-lg text-blue-700 hover:text-blue-800 font-medium"
                >
                  support@lamaison.com
                </a>
                <a 
                  href="mailto:chadajayasenareddy123@gmail.com" 
                  className="block text-lg text-blue-700 hover:text-blue-800 font-medium"
                >
                  chadajayasenareddy123@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin size={24} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    Visit Us
                  </h3>
                  <p className="text-sm text-stone-500">Come dine with us</p>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=2-7-303+Excise+Colony+Hanamkonda+506001"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-700 transition-colors"
              >
                <address className="not-italic text-stone-700 leading-relaxed hover:text-green-700">
                  2-7-303, Excise Colony<br />
                  Hanamkonda, 506001<br />
                  India
                </address>
              </a>
              <p className="text-xs text-stone-500 mt-2 italic">
                Click to view on Google Maps
              </p>
            </div>

            {/* Business Hours */}
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock size={24} className="text-purple-700" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    Business Hours
                  </h3>
                  <p className="text-sm text-stone-500">Open 7 days a week</p>
                </div>
              </div>
              <div className="space-y-2 text-stone-700">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday - Sunday:</span>
                  <span>10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass-card rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle size={28} className="text-amber-700" />
              <h2 className="font-serif text-2xl font-semibold text-stone-800">
                Common Issues & Support
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-6">
                <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-600" />
                  Table Issues
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  If you experienced any issues with your table assignment, seating comfort, 
                  or table cleanliness, please contact us immediately. We take table quality 
                  very seriously and will address your concerns promptly.
                </p>
              </div>

              <div className="border-b border-stone-200 pb-6">
                <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-600" />
                  Food Quality & Taste
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Your satisfaction with our cuisine is our top priority. If any dish didn't 
                  meet your expectations, please let us know. We value your feedback and will 
                  work to improve our menu and preparation.
                </p>
              </div>

              <div className="border-b border-stone-200 pb-6">
                <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-600" />
                  Service & Staff Behavior
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Our waiters and staff are trained to provide exceptional service. If you 
                  experienced any issues with staff behavior, service speed, or professionalism, 
                  please report it to us. We'll take immediate action to address the situation.
                </p>
              </div>

              <div className="border-b border-stone-200 pb-6">
                <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-600" />
                  Reservation Problems
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Having trouble with your booking? Need to modify or cancel a reservation? 
                  Contact us and we'll assist you with any reservation-related issues.
                </p>
              </div>

              <div className="pb-2">
                <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
                  <MessageCircle size={18} className="text-amber-600" />
                  Other Concerns
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  For any other questions, complaints, or feedback about your dining experience, 
                  ambiance, pricing, or facilities, please don't hesitate to reach out. We're 
                  committed to making every visit memorable.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact CTA */}
          <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-2xl p-8 text-center text-white">
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Need Immediate Assistance?
            </h3>
            <p className="mb-6 text-amber-100">
              Our support team is available during business hours to help you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+916300251692"
                className="px-6 py-3 bg-white text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                Call Now
              </a>
              <a 
                href="mailto:support@lamaison.com"
                className="px-6 py-3 bg-amber-800 text-white rounded-lg font-medium hover:bg-amber-900 transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
