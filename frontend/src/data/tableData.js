// Official capacity mapping - single source of truth
// Table1=4, Table2=5, Table3=2, Table4=3, Table5=6, Table6=1, Table7=8, Table8=7
export const CAPACITY_MAP = {
  1: 4,
  2: 5,
  3: 2,
  4: 3,
  5: 6,
  6: 1,
  7: 8,
  8: 7
};

export const tableDescriptions = {
  1: {
    capacity: 4,
    title: 'Modern Square Dining',
    description: 'A sophisticated modern square dining table set for four guests, featuring fine white linen, gleaming silverware, and crystal wine glasses at each place setting. Illuminated by a warm gold pendant lamp, the dark wood paneling and rich upholstery create a refined, intimate atmosphere perfect for dinner with friends or family.',
    image: '/tables/table1_4guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    features: ['4-seat square layout', 'Gold pendant lighting', 'Dark wood paneling']
  },
  2: {
    capacity: 5,
    title: 'Premium Round Table',
    description: 'A premium round dining table designed to seat exactly five guests in an intimate circle that encourages lively conversation. The polished dark marble tabletop is adorned with fine china, gold-trimmed cutlery, and crystal glasses, all anchored by a lush floral centerpiece beneath a warm chandelier.',
    image: '/tables/table2_5guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    features: ['Round 5-seat design', 'Marble tabletop', 'Chandelier lighting']
  },
  3: {
    capacity: 2,
    title: 'Romantic Intimate Table',
    description: 'An intimate corner table designed for couples, featuring two chairs facing each other across a beautifully appointed setting. A single rose in an elegant vase, a flickering candle, and fine crystal wine glasses set the mood. Dark velvet curtains and warm candlelight create a perfectly private romantic dining experience.',
    image: '/tables/table3_2guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    features: ['Couples seating', 'Candlelit ambiance', 'Velvet curtain privacy']
  },
  4: {
    capacity: 3,
    title: 'Window-Side Table',
    description: 'A charming window-side table arranged for three guests, positioned beside floor-to-ceiling windows offering a stunning twilight cityscape. Each place setting features polished silverware and crystal glasses, complemented by fresh botanical greenery on the windowsill and warm golden ambient lighting throughout.',
    image: '/tables/table4_3guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80',
    features: ['Cityscape view', 'Window seating for 3', 'Botanical decor']
  },
  5: {
    capacity: 6,
    title: 'Family Dining Table',
    description: 'A premium large rectangular table set for six guests, with three seats on each side, creating the perfect gathering for family dinners or celebrations. A long floral runner stretches down the center beneath elegant pendant lamps, while modern upholstered chairs and fine linen complete the warm, inviting atmosphere.',
    image: '/tables/table5_6guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
    features: ['6-seat rectangle', 'Pendant lamp series', 'Floral runner']
  },
  6: {
    capacity: 1,
    title: 'Elegant Solo Dining',
    description: 'An exclusive solo dining experience at a small round marble-topped table with a single perfectly arranged place setting. A crystal wine glass, fine cutlery, and a single orchid in a delicate vase accompany your meal, while a soft warm reading lamp creates a serene and contemplative atmosphere for the discerning solo diner.',
    image: '/tables/table6_1guest.png',
    fallbackImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    features: ['Solo seat', 'Marble tabletop', 'Reading lamp']
  },
  7: {
    capacity: 8,
    title: 'Grand Banquet Table',
    description: 'A grand banquet table designed for larger gatherings of up to eight guests. The long rectangular table is dressed in crisp white linen with eight complete place settings of fine china, crystal glasses, and gold cutlery. A magnificent crystal chandelier casts a brilliant glow over symmetrical floral arrangements, enhanced by dark wood paneling and opulent décor.',
    image: '/tables/table7_8guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    features: ['8-seat banquet', 'Crystal chandelier', 'Premium décor']
  },
  8: {
    capacity: 7,
    title: 'Formal Dining Table',
    description: 'A distinguished formal dining table set for seven guests around an elegant oval-shaped dark wood table. Each place features silver charger plates, crystal stemware, and polished cutlery. A classic brass chandelier illuminates fresh flower centerpieces and tall taper candles, while elegant wainscoting and warm wall sconces complete this refined dinner party setting.',
    image: '/tables/table8_7guests.png',
    fallbackImage: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
    features: ['7-seat formal', 'Brass chandelier', 'Taper candle accents']
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
