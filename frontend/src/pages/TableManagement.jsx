import React from 'react';

const TableManagement = () => {
  const tables = [
    {
      id: 1,
      currentGuests: 4,
      capacity: '1-2',
      title: 'Table 1 (1-2 Capacity)',
      description: 'An intimate, cozy corner booth featuring plush velvet seating and rich, dark wood paneling. Illuminated by a warm, modern glass pendant light, this table offers a perfectly private dining experience for singles or couples.',
      image: '/tables/1seating.PNG'
    },
    {
      id: 2,
      currentGuests: 5,
      capacity: '2-3',
      title: 'Table 2 (2-3 Capacity)',
      description: 'A comfortable square table nestled in a quiet booth setting, ideal for small groups of two or three. It features a minimalist floral centerpiece and soft, ambient lighting that enhances the warm, welcoming atmosphere.',
      image: '/tables/2seating.PNG'
    },
    {
      id: 3,
      currentGuests: 2,
      capacity: '3-4',
      title: 'Table 3 (3-4 Capacity)',
      description: 'A spacious, deeply cushioned L-shaped booth set around a polished square wooden table for up to four guests. Elegant candlelight reflects off the classic wood wainscoting, creating a classic, sophisticated dining environment.',
      image: '/tables/3seating.jpeg'
    },
    {
      id: 4,
      currentGuests: 3,
      capacity: '4',
      title: 'Table 4 (4 Capacity)',
      description: 'A sleek, rectangular wooden table positioned next to floor-to-ceiling windows, offering a beautiful twilight city view. Adorned with a lush, botanical table runner, it perfectly balances modern design with a warm, natural aesthetic.',
      image: '/tables/4seating.jpeg'
    },
    {
      id: 5,
      currentGuests: 6,
      capacity: '5',
      title: 'Table 5 (5 Capacity)',
      description: 'A premium round table designed for a group of five, encouraging easy conversation. It sits beneath an oversized, warm-toned drum chandelier and is anchored by a striking, tall floral centerpiece.',
      image: '/tables/5seating.jpeg'
    },
    {
      id: 6,
      currentGuests: 1,
      capacity: '6',
      title: 'Table 6 (6 Capacity)',
      description: 'A long, elegant rectangular table seating six guests, set against stunning evening cityscapes. The warm overhead lighting, modern wooden chairs, and continuous floral runner make it perfect for medium-sized gatherings.',
      image: '/tables/6seating.jpeg'
    },
    {
      id: 7,
      currentGuests: 8,
      capacity: '7',
      title: 'Table 7 (7 Capacity)',
      description: 'An opulent, large round table accommodating up to seven guests, situated in a grand, fully wood-paneled section of the dining room. It is highlighted by a magnificent crystal chandelier and luxurious, classic decor.',
      image: '/tables/7seating.jpeg'
    },
    {
      id: 8,
      currentGuests: 7,
      capacity: '8',
      title: 'Table 8 (8 Capacity)',
      description: 'A grand, formal rectangular table draped in crisp linens, designed for larger parties of up to eight. Set beneath a brilliant classic chandelier with symmetrical, high-end floral arrangements, offering the ultimate premium dining experience.',
      image: '/tables/8seating.jpeg'
    }
  ];

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
                    
                    {/* Capacity Badge */}
                    <div className="absolute top-4 right-4 backdrop-blur-md bg-amber-900/60 text-amber-50 px-3 py-1 rounded-full text-sm font-semibold border border-amber-300/30 shadow-lg">
                      Capacity: {table.capacity}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-amber-50 mb-3 drop-shadow-md font-['Playfair_Display']">
                      {table.title}
                    </h3>

                    {/* Current Guests */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-3 py-1.5 rounded-lg border border-amber-200/20">
                        <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="text-amber-100 font-semibold text-sm">
                          Current Guests: <span className="text-amber-50">{table.currentGuests}</span>
                        </span>
                      </div>
                    </div>

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
