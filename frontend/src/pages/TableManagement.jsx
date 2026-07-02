import React from 'react';
import { tableDescriptions, CAPACITY_MAP } from '../data/tableData';

const TableManagement = () => {
  // Build tables array from the single source of truth (tableData.js)
  const tables = Object.keys(CAPACITY_MAP).map((tableNum) => {
    const num = parseInt(tableNum);
    const info = tableDescriptions[num];
    return {
      id: num,
      capacity: CAPACITY_MAP[num],
      title: `Table ${num}: ${info.title}`,
      description: info.description,
      image: info.image,
      features: info.features
    };
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Warm Abstract Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-40 right-40 w-96 h-96 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-50 mb-4 drop-shadow-lg font-['Playfair_Display']">
            Restaurant Table Management
          </h1>
          <p className="text-xl text-amber-100 drop-shadow-md">
            Experience the warmth of fine dining
          </p>
        </div>

        {/* Table Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Frosted Glass Card */}
                <div className="relative backdrop-blur-xl bg-white/10 border border-amber-200/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-500/20 transition-all duration-300">
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-400/0 to-red-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-red-400/10 transition-all duration-500"></div>
                  
                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-amber-300/20 group-hover:ring-amber-300/40 transition-all duration-300"></div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={table.image}
                      alt={table.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Capacity Badge - Frosted Glass */}
                    <div
                      className="absolute top-4 right-4 text-amber-50 px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                      style={{
                        backdropFilter: 'blur(12px)',
                        background: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.25)'
                      }}
                    >
                      {table.capacity} Capacity
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-amber-50 mb-2 drop-shadow-md font-['Playfair_Display']">
                      {table.title}
                    </h3>

                    {/* Seats subtitle */}
                    <p className="text-sm text-amber-200 mb-3 font-medium">
                      Seats up to {table.capacity} {table.capacity === 1 ? 'guest' : 'guests'}
                    </p>

                    {/* Features */}
                    {table.features && table.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {table.features.map((feature, idx) => (
                          <span key={idx} className="text-xs bg-amber-400/15 text-amber-200 px-2 py-0.5 rounded-full border border-amber-300/20">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-amber-100/90 text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                      {table.description}
                    </p>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </div>
  );
};

export default TableManagement;
