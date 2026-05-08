// Image paths - will use local images from /tables/ folder
// Falls back to Unsplash if local images not found
export const tableDescriptions = {
  1: {
    capacity: '1-2',
    title: 'Intimate Corner Booth',
    description: 'An intimate, cozy corner booth featuring plush velvet seating and rich, dark wood paneling. Illuminated by a warm, modern glass pendant light, this table offers a perfectly private dining experience for singles or couples.',
    image: '/tables/1seating.PNG',
    fallbackImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    features: ['Private seating', 'Warm lighting', 'Velvet cushions']
  },
  2: {
    capacity: '2-3',
    title: 'Quiet Booth Setting',
    description: 'A comfortable square table nestled in a quiet booth setting, ideal for small groups of two or three. It features a minimalist floral centerpiece and soft, ambient lighting that enhances the warm, welcoming atmosphere.',
    image: '/tables/2seating.PNG',
    fallbackImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    features: ['Booth seating', 'Floral centerpiece', 'Ambient lighting']
  },
  3: {
    capacity: '3-4',
    title: 'Elegant L-Shaped Booth',
    description: 'A spacious, deeply cushioned L-shaped booth set around a polished square wooden table for up to four guests. Elegant candlelight reflects off the classic wood wainscoting, creating a classic, sophisticated dining environment.',
    image: '/tables/3seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    features: ['L-shaped seating', 'Candlelight ambiance', 'Wood paneling']
  },
  4: {
    capacity: '4',
    title: 'Window View Table',
    description: 'A sleek, rectangular wooden table positioned next to floor-to-ceiling windows, offering a beautiful twilight city view. Adorned with a lush, botanical table runner, it perfectly balances modern design with a warm, natural aesthetic.',
    image: '/tables/4seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80',
    features: ['City view', 'Window seating', 'Botanical decor']
  },
  5: {
    capacity: '5',
    title: 'Premium Round Table',
    description: 'A premium round table designed for a group of five, encouraging easy conversation. It sits beneath an oversized, warm-toned drum chandelier and is anchored by a striking, tall floral centerpiece.',
    image: '/tables/5seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    features: ['Round table', 'Chandelier lighting', 'Tall centerpiece']
  },
  6: {
    capacity: '6',
    title: 'Cityscape Dining',
    description: 'A long, elegant rectangular table seating six guests, set against stunning evening cityscapes. The warm overhead lighting, modern wooden chairs, and continuous floral runner make it perfect for medium-sized gatherings.',
    image: '/tables/6seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    features: ['Panoramic views', 'Modern design', 'Floral runner']
  },
  7: {
    capacity: '7',
    title: 'Grand Crystal Room',
    description: 'An opulent, large round table accommodating up to seven guests, situated in a grand, fully wood-paneled section of the dining room. It is highlighted by a magnificent crystal chandelier and luxurious, classic decor.',
    image: '/tables/7seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    features: ['Crystal chandelier', 'Wood-paneled room', 'Luxury seating']
  },
  8: {
    capacity: '8',
    title: 'Formal Banquet Table',
    description: 'A grand, formal rectangular table draped in crisp linens, designed for larger parties of up to eight. Set beneath a brilliant classic chandelier with symmetrical, high-end floral arrangements, offering the ultimate premium dining experience.',
    image: '/tables/8seating.jpeg',
    fallbackImage: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
    features: ['Formal setting', 'Premium linens', 'Symmetrical decor']
  }
};

export const getTableInfo = (tableNumber) => {
  return tableDescriptions[tableNumber] || {
    capacity: 'N/A',
    title: `Table ${tableNumber}`,
    description: 'A comfortable dining table perfect for your party.',
    image: '/tables/default.jpg',
    features: []
  };
};
