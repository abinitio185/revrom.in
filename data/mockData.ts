
import type { Trip, Departure, Review, BlogPost, GalleryPhoto, InstagramPost, GoogleReview, SiteContent, ItineraryQuery, ThemeColors, CustomPage, SectionConfig } from '../types';
import { themes } from './themes';

export const trips: Trip[] = [
  {
    id: 'ladakh-manali-leh',
    title: 'The Manali-Leh Conquest',
    destination: 'Ladakh, India',
    shortDescription: 'Conquer two of the world\'s highest motorable passes on this epic journey from Manali to Leh.',
    longDescription: '### The Ultimate Himalayan Odyssey\n\nEmbark on the ultimate Himalayan odyssey. This classic motorcycle expedition takes you from the lush green valleys of Manali to the arid, high-altitude desert of Ladakh. You will traverse treacherous passes, including the famed Khardung La, witness breathtaking landscapes, and immerse yourself in the unique culture of the region.\n\nThis is more than a tour; it\'s a rite of passage for any serious adventure rider.\n\n#### What to Expect\n* **Epic Roads:** Conquer some of the world\'s highest motorable passes.\n* **Stunning Scenery:** From green valleys to barren high-altitude deserts.\n* **Cultural Immersion:** Visit ancient monasteries and experience Ladakhi culture.\n* **A True Challenge:** A test of skill and endurance for any rider.',
    duration: 12,
    price: 265000,
    imageUrl: 'https://picsum.photos/seed/ladakh-bike/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-pass/1200/800',
      'https://picsum.photos/seed/ladakh-monastery/1200/800',
      'https://picsum.photos/seed/ladakh-road/1200/800',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Manali', description: 'Arrive in Manali, the gateway to the Himalayas. Get acquainted with your Royal Enfield and the team.' },
      { day: 2, title: 'Manali to Jispa', description: 'Begin the ascent, crossing the Rohtang Pass into the Lahaul Valley. A challenging and scenic first day.' },
      { day: 3, title: 'Jispa to Sarchu', description: 'Ride through stunning landscapes, crossing the Baralacha La pass. Camp overnight under the stars at Sarchu.' },
      { day: 4, title: 'Sarchu to Leh', description: 'A long day of riding through the Gata Loops and Tanglang La, the second highest motorable pass.' },
      { day: 5, title: 'Rest Day in Leh', description: 'Acclimatize to the altitude. Explore Leh\'s vibrant market, Shanti Stupa, and Leh Palace.' },
      { day: 6, title: 'Leh to Khardung La & Back', description: 'Ride to the top of Khardung La, the world\'s highest motorable road, for panoramic views.' },
      { day: 7, title: 'Leh to Pangong Lake', description: 'Travel to the mesmerizing Pangong Tso, a high-altitude lake of stunning beauty that changes colors.' },
      { day: 8, title: 'Pangong to Leh', description: 'Ride back to Leh, crossing the mighty Chang La pass.' },
      { day: 9, title: 'Leh to Alchi', description: 'Explore the monasteries of the Sham Valley, including the ancient Alchi Monastery.' },
      { day: 10, title: 'Alchi to Kargil', description: 'Ride towards Kargil, passing through the stark landscapes of Lamayuru, the "Moonland".' },
      { day: 11, title: 'Kargil to Srinagar', description: 'Cross the Zoji La pass, descending into the beautiful Kashmir valley.' },
      { day: 12, title: 'Departure from Srinagar', description: 'Your epic journey concludes. Depart from Srinagar with unforgettable memories.' },
    ],
    inclusions: ['Royal Enfield Himalayan Bike', 'Support Vehicle', 'Experienced Mechanic', 'All accommodations', 'Breakfast & Dinner', 'Permits'],
    exclusions: ['Flights', 'Lunch', 'Fuel', 'Riding Gear', 'Travel Insurance'],
    activities: ['high-altitude riding', 'pass crossing', 'cultural immersion', 'landscape photography'],
    difficulty: 'Advanced',
    route: 'Manali - Jispa - Sarchu - Leh - Srinagar',
    routeCoordinates: [[32.24, 77.18], [32.65, 77.20], [33.09, 77.58], [34.16, 77.57], [34.28, 77.60], [33.75, 78.65], [34.16, 77.57], [34.28, 76.88], [34.55, 76.13], [34.08, 74.79]],
    reviews: [
      { name: 'Alex R.', rating: 5, comment: 'An absolutely life-changing experience. The views were surreal and the Royal Enfield was a dream to ride. The team was quite nice. Highly recommended!', date: '2024-06-15' },
      { name: 'Samantha B.', rating: 4, comment: 'Incredible journey, but be prepared for the altitude! The roads are challenging but rewarding. The support crew was fantastic.', date: '2024-06-20' },
    ],
    seo: {
        title: 'Manali to Leh Bike Trip Package 2024 | Revrom.in',
        description: 'Book the ultimate Manali to Leh motorcycle expedition. 12 days of high-altitude adventure crossing Khardung La and Pangong Tso.',
        keywords: 'manali to leh bike trip, ladakh motorcycle tour, khardung la bike ride, himalayan moto tours',
        ogImage: 'https://picsum.photos/seed/ladakh-bike/1200/630'
    }
  },
  {
    id: 'ladakh-nubra-valley',
    title: 'Nubra Valley Expeditions',
    destination: 'Ladakh, India',
    shortDescription: 'Explore the enigmatic cold desert of Nubra Valley, ride camels, and visit ancient monasteries.',
    longDescription: '### A Journey to the Land of Contrasts\n\nDiscover a land of contrasts on this tour to the Nubra Valley. Separated from the Industry Valley by the mighty Khardung La, Nubra is a serene desert oasis with lush villages, ancient monasteries, and the famous double-humped Bactrian camels.\n\n#### Highlights of the Expedition\n* **Khardung La Pass:** Ride over one of the world\'s highest motorable roads.\n* **Desert Oasis:** Explore the unique sand dunes of Hunder at high altitude.\n* **Bactrian Camels:** Enjoy a ride on the rare double-humped camels.\n* **Diskit Monastery:** Visit the oldest and largest monastery in Nubra Valley, with its iconic Maitreya Buddha statue.\n\nThis tour offers a perfect blend of manageable adventure riding and rich cultural exploration, ideal for those looking to experience the best of Ladakh in a shorter timeframe.',
    duration: 7,
    price: 160000,
    imageUrl: 'https://picsum.photos/seed/ladakh-nubra/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-camel/1200/800',
      'https://picsum.photos/seed/ladakh-diskit/1200/800',
      'https://picsum.photos/seed/ladakh-river/1200/800',
    ],
    itinerary: [
        { day: 1, title: 'Arrival in Leh', description: 'Arrive in Leh and acclimatize. Short orientation and bike check in the evening.' },
        { day: 2, title: 'Leh Local Sightseeing', description: 'Visit local monasteries like Thiksey and Hemis to get a feel for the culture and your bike.' },
        { day: 3, title: 'Leh to Nubra Valley via Khardung La', description: 'Cross the mighty Khardung La pass and descend into the breathtaking Nubra Valley.' },
        { day: 4, title: 'Explore Nubra (Diskit & Hunder)', description: 'Visit the Diskit Monastery with its giant Buddha statue and ride the Bactrian camels on the Hunder sand dunes.' },
        { day: 5, title: 'Nubra to Pangong Lake', description: 'Take the scenic and less-traveled road along the Shyok River to reach the stunning Pangong Lake.' },
        { day: 6, title: 'Pangong Lake to Leh', description: 'Enjoy a beautiful sunrise over the lake before riding back to Leh via the Chang La pass.' },
        { day: 7, title: 'Departure from Leh', description: 'After breakfast, transfer to the airport for your flight home.' },
    ],
    inclusions: ['Royal Enfield Himalayan', 'Accommodation', 'Breakfast & Dinner', 'Inner Line Permits', 'Support Vehicle'],
    exclusions: ['Flights', 'Lunch', 'Fuel', 'Riding Gear', 'Tips'],
    activities: ['motorcycle touring', 'desert exploration', 'monastery visits', 'camel riding'],
    difficulty: 'Intermediate',
    route: 'Leh - Khardung La - Nubra Valley - Pangong Tso - Leh',
    routeCoordinates: [[34.16, 77.57], [34.28, 77.60], [34.58, 77.56], [34.20, 78.14], [33.75, 78.65], [33.99, 77.85], [34.16, 77.57]],
    reviews: [
        { name: 'John D.', rating: 5, comment: 'Perfect trip for someone with limited time. Khardung La was the highlight, and the camels in Hunder were a unique experience. Well organized.', date: '2024-07-05' },
    ],
    seo: {
        title: 'Nubra Valley Motorcycle Expedition | Ladakh Tours',
        description: '7-day motorcycle tour to Nubra Valley via Khardung La. Experience the sand dunes of Hunder and ride Bactrian camels in the high Himalayas.',
        keywords: 'nubra valley bike trip, khardung la pass, hunder sand dunes, ladakh shorter tours',
        ogImage: 'https://picsum.photos/seed/ladakh-nubra/1200/630'
    }
  },
  {
    id: 'ladakh-changthang-lakes',
    title: 'High Passes of Changthang',
    destination: 'Ladakh, India',
    shortDescription: 'An adventurous ride through the remote Changthang plateau, visiting the high-altitude lakes of Pangong and Tso Moriri.',
    longDescription: '### A Ride into the Wild Heart of Ladakh\n\nFor the seasoned rider seeking solitude and raw beauty, this tour explores the remote Changthang region. This high-altitude plateau is a land of vast open spaces, home to nomadic shepherds, rare wildlife, and the mesmerizingly beautiful lakes of Pangong Tso and Tso Moriri.\n\nIt\'s a challenging ride through some of the most isolated and stunning landscapes on earth.\n\n#### Key Highlights\n* **Remote Wilderness:** Experience the untouched beauty of the Changthang plateau.\n* **High-Altitude Lakes:** Witness the breathtaking azure waters of Pangong Tso and Tso Moriri.\n* **Unique Wildlife:** Spot rare species like the Kyang (Tibetan wild ass) and the black-necked crane.\n* **Nomadic Culture:** Get a glimpse into the life of the Changpa nomads.',
    duration: 9,
    price: 210000,
    imageUrl: 'https://picsum.photos/seed/ladakh-lake/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-wildlife/1200/800',
      'https://picsum.photos/seed/ladakh-nomad/1200/800',
      'https://picsum.photos/seed/ladakh-tso/1200/800',
    ],
    itinerary: [
        { day: 1, title: 'Arrival & Acclimatization in Leh', description: 'Arrive in Leh and rest to acclimatize to the high altitude of 3500m.' },
        { day: 2, title: 'Leh to Pangong Lake via Chang La', description: 'Begin your journey, crossing the formidable Chang La pass to reach the azure waters of Pangong Lake.' },
        { day: 3, title: 'Pangong to Hanle', description: 'Ride through the remote Changthang wilderness to Hanle, home to an ancient monastery and an Indian Astronomical Observatory.' },
        { day: 4, title: 'Hanle to Tso Moriri', description: 'Continue across the plateau to the pristine, sacred lake of Tso Moriri, a designated wetland reserve.' },
        { day: 5, title: 'Explore Tso Moriri (Korzok)', description: 'Spend the day exploring the area around the lake and visiting the Korzok Monastery, one of the oldest in the region.' },
        { day: 6, title: 'Tso Moriri to Tso Kar', description: 'Ride to the salt lake of Tso Kar, another important wetland and a haven for birdwatchers.' },
        { day: 7, title: 'Tso Kar to Leh via Tanglang La', description: 'Head back towards Leh, crossing the spectacular Tanglang La pass.' },
        { day: 8, title: 'Rest day in Leh', description: 'A final day in Leh for souvenir shopping or relaxing.' },
        { day: 9, title: 'Departure from Leh', description: 'Transfer to the airport for your onward journey.' },
    ],
    inclusions: ['Bike Rental', 'Support Vehicle', 'Mechanic', 'Accommodation (Hotels/Camps)', 'All Permits', 'Breakfast & Dinner'],
    exclusions: ['Flights', 'Lunch', 'Fuel', 'Riding gear rental', 'Personal expenses'],
    activities: ['adventure riding', 'wildlife spotting', 'high-altitude lakes', 'cultural exploration'],
    difficulty: 'Expert',
    route: 'Leh - Pangong - Hanle - Tso Moriri - Tso Kar - Leh',
    routeCoordinates: [[34.16, 77.57], [33.99, 77.85], [33.75, 78.65], [32.77, 79.00], [32.90, 78.29], [33.30, 78.02], [33.77, 77.78], [34.16, 77.57]],
    reviews: [
      { name: 'Maria S.', rating: 5, comment: 'This is the real deal for adventure seekers. The landscapes are otherworldly. Tough ride, but worth every moment. The team was exceptional, especially our mechanic.', date: '2024-08-01' },
      { name: 'Kenji T.', rating: 5, comment: 'Mind-blowing beauty and solitude. Tso Moriri was a spiritual experience. Not for the faint of heart, but if you are an experienced rider, do not miss this.', date: '2024-08-05' },
    ],
    seo: {
        title: 'Changthang Plateau & Great Lakes Bike Tour | Revrom',
        description: 'Ride the remote Changthang plateau. Visit Pangong Tso, Tso Moriri, and Hanle on this expert-level motorcycle expedition.',
        keywords: 'changthang bike ride, tso moriri lake tour, hanle observatory, ladakh offroad biking',
        ogImage: 'https://picsum.photos/seed/ladakh-lake/1200/630'
    }
  },
  {
    id: 'zanskar-forbidden-kingdom',
    title: 'The Forbidden Kingdom of Zanskar',
    destination: 'Zanskar, India',
    shortDescription: 'An adventurous ride into the isolated and rugged Zanskar valley, a true test of a rider\'s spirit.',
    longDescription: '### Venture into the Last True Himalayan Kingdom\n\nThis is not just a tour; it\'s an expedition. Zanskar, one of the most remote regions in the Himalayas, is a land of stark beauty, ancient monasteries, and the famous double-humped Bactrian camels.\n\n#### Expedition Highlights\n* **Extreme Remoteness:** Traverse one of the most isolated regions on the planet.\n* **Pensi La Pass:** Conquer the gateway to Zanskar with stunning views of the Drang-Drung Glacier.\n* **Cliffside Monasteries:** Witness the architectural marvels of Phugtal and Karsha monasteries.\n* **Ultimate Challenge:** A demanding route for experienced riders seeking the ultimate adventure.',
    duration: 14,
    price: 315000,
    imageUrl: 'https://picsum.photos/seed/ladakh-zanskar/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-glacier/1200/800',
      'https://picsum.photos/seed/ladakh-phugtal/1200/800',
      'https://picsum.photos/seed/ladakh-zanskar-road/1200/800',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Leh', description: 'Arrive and acclimatize in Leh.' },
      { day: 2, title: 'Leh to Kargil', description: 'Start the journey west, passing through historical sites and the stark landscapes of Lamayuru.' },
      { day: 3, title: 'Kargil to Rangdum', description: 'Enter the Suru Valley, with magnificent views of the Nun-Kun peaks, and head towards Rangdum.' },
      { day: 4, title: 'Rangdum to Padum via Pensi La', description: 'Cross the formidable Pensi La pass, the gateway to Zanskar, and witness the stunning Drang-Drung Glacier.' },
      { day: 5, title: 'Explore Padum and its surroundings', description: 'Visit the ancient Karsha and Sani monasteries near Padum, the administrative center of Zanskar.' },
      { day: 6, title: 'Padum to Shinku La and back', description: 'Ride on the newly opened road towards the challenging Shinku La pass.' },
      { day: 7, title: 'Padum to Rangdum', description: 'Begin the ride back out of the Zanskar valley.' },
      { day: 8, title: 'Rangdum to Kargil', description: 'Continue back through the Suru Valley.' },
      { day: 9, title: 'Kargil to Leh', description: 'Return journey to Leh.' },
      { day: 10, title: 'Rest day in Leh', description: 'A much-needed rest day to recover from the tough ride.' },
      { day: 11, title: 'Leh to Nubra Valley', description: 'A classic ride over Khardung La to the beautiful Nubra Valley.' },
      { day: 12, title: 'Nubra Valley to Pangong Lake', description: 'Traverse the scenic Shyok river route to reach Pangong Tso.' },
      { day: 13, title: 'Pangong Lake to Leh', description: 'Ride back to Leh, completing the grand circuit.' },
      { day: 14, title: 'Departure from Leh', description: 'Depart from Leh with epic memories of Zanskar.' },
    ],
    inclusions: ['Royal Enfield Himalayan', 'All Accommodations (Guesthouses/Camps)', 'All Meals (Breakfast, Lunch, Dinner)', 'Support Vehicle & Mechanic', 'All Permits'],
    exclusions: ['Flights', 'Fuel', 'Riding Gear', 'Personal Expenses', 'Travel Insurance'],
    activities: ['expedition riding', 'glacier viewing', 'remote exploration', 'ancient monasteries'],
    difficulty: 'Expert',
    route: 'Leh - Kargil - Rangdum - Padum - Leh',
    routeCoordinates: [[34.16, 77.57], [34.55, 76.13], [34.25, 75.87], [33.85, 76.28], [33.47, 76.88], [33.85, 76.28], [34.25, 75.87], [34.55, 76.13], [34.16, 77.57]],
    reviews: [],
    seo: {
        title: 'Zanskar Valley Motorcycle Expedition | The Forbidden Kingdom',
        description: 'Ride into the isolated Zanskar Valley. See the Drang-Drung Glacier and Phugtal Monastery on this 14-day expert motorcycle tour.',
        keywords: 'zanskar bike trip, padum motorcycle tour, pensi la pass, remote himalayan biking',
        ogImage: 'https://picsum.photos/seed/ladakh-zanskar/1200/630'
    }
  },
  {
    id: 'spiti-valley-adventure',
    title: 'Spiti Valley: The Middle Land Adventure',
    destination: 'Spiti, India',
    shortDescription: 'Journey through the moonscapes of Spiti Valley, visiting the world\'s highest villages and ancient monasteries.',
    longDescription: '### Discover the World Within a World\n\nSpiti Valley, known as "The Middle Land" between India and Tibet, is a cold desert mountain valley that promises an unforgettable adventure. This circuit takes you from the green hills of Shimla into the rugged, barren landscapes of Spiti, crossing high passes and visiting ancient Buddhist monasteries that seem to defy gravity.\n\n#### Journey Highlights\n* **Hindustan-Tibet Highway:** Ride on one of the most treacherous and beautiful roads in the world.\n* **Ancient Monasteries:** Visit the Key Monastery and the Tabo Monastery, a UNESCO World Heritage site.\n* **Highest Villages:** Visit some of the world\'s highest inhabited villages like Komic and Hikkim.\n* **Chandratal Lake:** Camp by the stunning "Moon Lake", a high-altitude wetland of breathtaking beauty.',
    duration: 11,
    price: 260000,
    imageUrl: 'https://picsum.photos/seed/ladakh-spiti/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-key-monastery/1200/800',
      'https://picsum.photos/seed/ladakh-chandratal/1200/800',
      'https://picsum.photos/seed/ladakh-spiti-road/1200/800',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla', description: 'Arrive in the historic hill station of Shimla and prepare for the journey ahead.' },
      { day: 2, title: 'Shimla to Sangla', description: 'Begin the ride along the Hindustan-Tibet highway, entering the beautiful Kinnaur valley.' },
      { day: 3, title: 'Sangla to Kalpa', description: 'Explore Chitkul, the last village on the Indo-Tibetan border, and ride to Kalpa for stunning mountain views.' },
      { day: 4, title: 'Kalpa to Kaza', description: 'Cross into the Spiti Valley, visiting the ancient Tabo Monastery en route to Kaza.' },
      { day: 5, title: 'Explore Kaza and surroundings', description: 'Visit the iconic Key Monastery, and the high-altitude villages of Hikkim, Komic, and Langza.' },
      { day: 6, title: 'Kaza to Chandratal', description: 'Ride to the breathtaking Chandratal Lake, crossing the Kunzum Pass. Overnight in a camp near the lake.' },
      { day: 7, title: 'Chandratal to Manali', description: 'Cross the mighty Rohtang Pass and descend into the lush Kullu Valley, ending the circuit in Manali.' },
      { day: 8, title: 'Rest day in Manali', description: 'Relax and explore the vibrant town of Manali.' },
      { day: 9, title: 'Manali to Chandigarh', description: 'A long ride down from the mountains to the plains of Chandigarh.' },
      { day: 10, title: 'Explore Chandigarh & Farewell Dinner', description: 'Explore the planned city of Chandigarh and enjoy a farewell dinner with the group.' },
      { day: 11, title: 'Departure from Chandigarh', description: 'Depart from Chandigarh.' },
    ],
    inclusions: ['Bike Rental', 'Accommodation', 'Breakfast & Dinner', 'Support Vehicle', 'Mechanic', 'Permits'],
    exclusions: ['Flights', 'Lunch', 'Fuel', 'Riding Gear', 'Entry fees'],
    activities: ['high-altitude desert', 'monastery tour', 'pass crossing', 'cultural experience'],
    difficulty: 'Advanced',
    route: 'Shimla - Sangla - Kalpa - Kaza - Chandratal - Manali',
    routeCoordinates: [[31.10, 77.17], [31.42, 78.26], [31.52, 78.03], [32.22, 78.03], [32.29, 77.63], [32.24, 77.18], [30.73, 76.77]],
    reviews: [],
    seo: {
        title: 'Spiti Valley Bike Trip | The Middle Land Adventure',
        description: '11-day complete circuit of Spiti Valley starting from Shimla. Visit Kaza, Chandratal, and Key Monastery on this adventure ride.',
        keywords: 'spiti valley bike tour, shimla to kaza, chandratal lake camping, himachal motorcycle trip',
        ogImage: 'https://picsum.photos/seed/ladakh-spiti/1200/630'
    }
  },
  {
    id: 'kashmir-paradise-ride',
    title: 'Kashmir: Paradise on Earth Ride',
    destination: 'Kashmir, India',
    shortDescription: 'A soul-stirring ride through the lush valleys of Kashmir, exploring Srinagar, Gulmarg, and Pahalgam.',
    longDescription: '### Ride Through Heaven on Earth\n\nExperience the unparalleled beauty of Kashmir, often described as "Paradise on Earth." This tour is a more relaxed yet incredibly scenic journey through lush green valleys, serene lakes, and Mughal gardens. It combines the thrill of riding with the tranquility of Kashmir\'s breathtaking landscapes, offering a perfect blend of adventure and leisure.\n\n#### Tour Highlights\n* **Srinagar\'s Dal Lake:** Stay in a traditional houseboat and enjoy a Shikara ride.\n* **Mughal Gardens:** Explore the beautifully manicured Shalimar Bagh and Nishat Bagh.\n* **Gulmarg & Pahalgam:** Ride to the stunning meadows of Gulmarg and the picturesque valleys of Pahalgam.\n* **Gurez Valley:** A challenging extension to the remote and stunning Gurez Valley near the Line of Control.',
    duration: 8,
    price: 175000,
    imageUrl: 'https://picsum.photos/seed/ladakh-kashmir/800/600',
    gallery: [
      'https://picsum.photos/seed/ladakh-dal-lake/1200/800',
      'https://picsum.photos/seed/ladakh-gulmarg/1200/800',
      'https://picsum.photos/seed/ladakh-pahalgam/1200/800',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar', description: 'Arrive in Srinagar, check into a houseboat on Dal Lake, and enjoy a relaxing Shikara ride.' },
      { day: 2, title: 'Srinagar Local Sightseeing', description: 'Explore the famous Mughal Gardens and the old city of Srinagar.' },
      { day: 3, title: 'Srinagar to Gulmarg', description: 'Ride to the "Meadow of Flowers," Gulmarg. Enjoy the scenic beauty and take the Gondola ride for panoramic Himalayan views.' },
      { day: 4, title: 'Gulmarg to Pahalgam', description: 'A beautiful ride to Pahalgam, the "Valley of Shepherds," situated at the confluence of the Lidder River.' },
      { day: 5, title: 'Explore Pahalgam', description: 'Explore the scenic Betaab Valley and Aru Valley near Pahalgam.' },
      { day: 6, title: 'Pahalgam to Gurez Valley', description: 'Embark on a challenging ride to the remote and incredibly beautiful Gurez Valley.' },
      { day: 7, title: 'Gurez Valley to Srinagar', description: 'Ride back from Gurez to Srinagar, enjoying the views one last time.' },
      { day: 8, title: 'Departure from Srinagar', description: 'Your memorable Kashmir ride concludes. Depart from Srinagar.' },
    ],
    inclusions: ['Royal Enfield Classic 350', 'Accommodation (Hotels/Houseboat)', 'Breakfast & Dinner', 'Support Vehicle', 'All Permits'],
    exclusions: ['Flights', 'Lunch', 'Fuel', 'Gondola/Pony rides', 'Personal expenses'],
    activities: ['leisure riding', 'scenic valleys', 'houseboat stay', 'cultural sightseeing'],
    difficulty: 'Intermediate',
    route: 'Srinagar - Gulmarg - Pahalgam - Gurez - Srinagar',
    routeCoordinates: [[34.08, 74.79], [34.05, 74.38], [33.81, 75.12], [34.73, 74.87], [34.08, 74.79]],
    reviews: [],
    seo: {
        title: 'Kashmir Motorcycle Tour | Srinagar, Gulmarg & Gurez',
        description: 'Ride through paradise. Explore the lush valleys of Kashmir, stay in a houseboat, and visit the remote Gurez Valley.',
        keywords: 'kashmir bike trip, srinagar motorcycle rental, gurez valley ride, gulmarg tour',
        ogImage: 'https://picsum.photos/seed/ladakh-kashmir/1200/630'
    }
  }
];

export const departures: Departure[] = [
    { id: 'dep1', tripId: 'ladakh-manali-leh', startDate: '2024-07-15', endDate: '2024-07-26', slots: 4, status: 'Limited' },
    { id: 'dep2', tripId: 'ladakh-manali-leh', startDate: '2024-08-10', endDate: '2024-08-21', slots: 8, status: 'Available' },
    { id: 'dep3', tripId: 'ladakh-nubra-valley', startDate: '2024-07-20', endDate: '2024-07-26', slots: 0, status: 'Sold Out' },
    { id: 'dep4', tripId: 'ladakh-nubra-valley', startDate: '2024-08-05', endDate: '2024-08-11', slots: 6, status: 'Available' },
    { id: 'dep5', tripId: 'ladakh-changthang-lakes', startDate: '2024-09-01', endDate: '2024-09-09', slots: 5, status: 'Available' },
    { id: 'dep6', tripId: 'ladakh-changthang-lakes', startDate: '2024-09-15', endDate: '2024-09-23', slots: 2, status: 'Limited' },
    { id: 'dep7', tripId: 'spiti-valley-adventure', startDate: '2024-08-20', endDate: '2024-08-30', slots: 7, status: 'Available' },
    { id: 'dep8', tripId: 'kashmir-paradise-ride', startDate: '2024-09-05', endDate: '2024-09-12', slots: 3, status: 'Limited' },
];

export const blogPosts: BlogPost[] = [
    {
        id: 'blog-4',
        title: 'Forged by the Frontier: Our Story from Chushul Village',
        author: 'Tashi Wangyal, Founder',
        date: '2024-09-10',
        imageUrl: 'https://picsum.photos/seed/ladakh-chushul-village/800/600',
        excerpt: 'Discover the story behind Revrom.in, born from the remote, resilient spirit of Chushul village, home to the legendary Rezang La war memorial and the strategic Chushul Heights.',
        content: 'Our story isn\'t written in boardrooms; it\'s etched into the high-altitude desert landscapes of Ladakh, specifically in a place we call home: Chushul village. Located on the extreme frontier of India, Chushul is more than just a remote settlement; it is a land of immense beauty, harsh weather, and profound historical significance.\n\n**The Legacy of Rezang La**\n\nTo understand us, you must first understand the legacy of the land. Chushul is home to the Rezang La War Memorial, a solemn tribute to the incredible bravery of the 13th Kumaon Regiment\'s \'C\' Company led by Major Shaitan Singh. In the freezing winter of 1962, these 120 men fought to the last man and last bullet against overwhelming odds to protect Ladakh. This act of supreme sacrifice is not just history to us; it is the very fabric of our identity. It teaches us that resilience isn\'t just about surviving the harsh climate, but about standing firm in what you believe in, no matter the odds. This spirit of unyielding courage is what we breathe every day.\n\n**The Significance of Chushul Heights**\n\nThe landscape around our village is dominated by the strategic Chushul Heights—Black Top, Helmet Top, and Gurung Hill. These peaks are silent sentinels that have witnessed history unfold. Living at 14,000 feet, amidst these imposing giants, shapes a unique perspective. It demands a deep understanding of the terrain and a humble respect for nature\'s power. For us, these heights represent the ability to see the bigger picture and the fortitude required to navigate life on the edge—qualities we bring to every tour we design.\n\n**Our Promise: An Authentic Experience**\n\nOur roots in Chushul mean we are not just tour operators; we are storytellers and custodians of our culture. Our team, born and raised in this extreme environment, possesses an unparalleled, intimate knowledge of the routes, the weather, and the hidden gems that other tours miss. When you ride with Revrom.in, you\'re not just a tourist; you are a guest, welcomed into our world to experience the raw, unfiltered beauty and spirit of the true Ladakh. We take you beyond the postcards and into the heart of the Himalayas.',
        seo: {
            title: 'The Revrom Story: Chushul, Rezang La & Resilience',
            description: 'Learn about the origins of Revrom.in in the historic Chushul village, Ladakh. Discover the legacy of Rezang La and how the frontier spirit shapes our motorcycle tours.',
            keywords: 'chushul village, rezang la memorial, chushul heights, ladakh history, revrom story',
            ogImage: 'https://picsum.photos/seed/ladakh-chushul-village/1200/630'
        }
    },
    {
        id: 'blog-1',
        title: 'Top 5 Must-See Monasteries in Ladakh',
        author: 'Rider Jane',
        date: '2024-05-20',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog1/800/600',
        excerpt: 'Ladakh is not just about thrilling roads; it\'s a land of deep spiritual heritage. Discover the most breathtaking monasteries that you cannot miss on your journey.',
        content: 'Ladakh, often called "Little Tibet", is renowned for its stunning monasteries or "gompas". Perched on hilltops, these centers of Buddhist learning offer peace and spectacular views. Here are our top 5 picks:\n\n**1. Thiksey Monastery:** Affiliated with the Gelug sect of Tibetan Buddhism, it is noted for its resemblance to the Potala Palace in Lhasa, Tibet. The 12-story complex houses many items of Buddhist art such as stupas, statues, thangkas, wall paintings and swords.\n\n**2. Hemis Monastery:** The wealthiest monastery in Ladakh, Hemis is famous for its annual Hemis festival honoring Padmasambhava. It\'s a must-visit for its rich collection of ancient relics.\n\n**3. Diskit Monastery:** Located in the beautiful Nubra Valley, Diskit is the oldest and largest monastery in the region. The highlight is the 32-meter tall statue of Maitreya Buddha, which offers panoramic views of the valley.\n\n**4. Alchi Monastery:** Situated on the banks of the Indus River, Alchi is unique for its flat-ground location and magnificent Kashmiri-influenced wall paintings, some of which date back to the 11th century.\n\n**5. Lamayuru Monastery:** One of the oldest monasteries, Lamayuru is famous for its "moonland" landscape. The monastery is home to around 150 monks and features a rich collection of thangkas and artifacts.',
        seo: {
            title: 'Top 5 Must-Visit Monasteries in Ladakh | Cultural Guide',
            description: 'Explore the spiritual heritage of Ladakh. Guide to Thiksey, Hemis, Diskit, Alchi, and Lamayuru monasteries.',
            keywords: 'ladakh monasteries, thiksey monastery, hemis festival, diskit nubra, buddhist culture',
            ogImage: 'https://picsum.photos/seed/ladakh-blog1/1200/630'
        }
    },
    {
        id: 'blog-2',
        title: 'Acclimatization 101: Riding High and Staying Healthy',
        author: 'Dr. Adventure',
        date: '2024-06-02',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog2/800/600',
        excerpt: 'High altitude can be a challenge. Learn the essential tips for proper acclimatization to ensure your Ladakh motorcycle tour is safe and enjoyable.',
        content: 'Riding in Ladakh means dealing with altitudes often exceeding 3,500 meters (11,500 feet). Acute Mountain Sickness (AMS) is a real risk. Here’s how to minimize it:\n\n**1. Go Slow:** Your first day in Leh should be all about rest. Avoid strenuous activity. Let your body adjust.\n\n**2. Hydrate, Hydrate, Hydrate:** Drink plenty of water, at least 3-4 liters a day. Avoid alcohol and caffeine as they can dehydrate you.\n\n**3. Eat Well:** Consume a high-carbohydrate diet. It helps your body use oxygen more efficiently.\n\n**4. Ascend Gradually:** Plan your itinerary to include gradual ascent. Never ascend more than 500 meters per day to sleep.\n\n**5. Know the Symptoms:** Headaches, dizziness, nausea, and shortness of breath are early signs of AMS. If you feel them, do not ascend further. Rest, and if they persist, descend.\n\nBy taking these precautions, you can enjoy the majestic beauty of Ladakh without compromising your health.',
        seo: {
            title: 'Acclimatization Tips for Ladakh Motorcycle Trips',
            description: 'Essential guide to preventing AMS (Acute Mountain Sickness) while riding in high-altitude Ladakh.',
            keywords: 'ladakh acclimatization, ams prevention, high altitude riding, leh ladakh health tips',
            ogImage: 'https://picsum.photos/seed/ladakh-blog2/1200/630'
        }
    },
    {
        id: 'blog-3',
        title: 'Packing for a Ladakh Moto Tour: The Ultimate Checklist',
        author: 'Gearhead Mike',
        date: '2024-06-18',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog3/800/600',
        excerpt: 'What to pack and what to leave behind? Our ultimate checklist, forged from years of experience, will help you prepare for the ride of a lifetime.',
        content: 'Packing right is crucial for a successful Ladakh trip. The weather can be unpredictable. Here’s a quick guide:\n\n**Riding Gear (Non-negotiable):**\n- Full-face helmet\n- Armored riding jacket and pants\n- Sturdy, over-the-ankle riding boots\n- Riding gloves (consider both summer and thermal pairs)\n\n**Clothing:**\n- Thermal base layers\n- Fleece or down mid-layer\n- T-shirts and comfortable pants for evenings\n- Woolen socks\n\n**Essentials:**\n- Sunscreen (SPF 50+)\n- Sunglasses (UV protection)\n- Lip balm with SPF\n- Personal first-aid kit with medication for AMS (consult your doctor)\n- Reusable water bottle\n\nRemember, layering is key. It allows you to adapt to the changing temperatures throughout the day.',
        seo: {
            title: 'Ultimate Packing List for Ladakh Motorcycle Tours',
            description: 'Complete checklist of riding gear, clothing, and essentials for your Ladakh bike trip. Don\'t leave home without these.',
            keywords: 'ladakh packing list, motorcycle touring gear, riding gear for himalayas, ladakh essentials',
            ogImage: 'https://picsum.photos/seed/ladakh-blog3/1200/630'
        }
    },
];

export const galleryPhotos: GalleryPhoto[] = [
    { id: 'gal1', imageUrl: 'https://picsum.photos/seed/gal1/800/600', caption: 'Winding roads of Zoji La Pass', category: 'Landscapes' },
    { id: 'gal2', imageUrl: 'https://picsum.photos/seed/gal2/600/800', caption: 'A rider taking a break', category: 'Riders' },
    { id: 'gal3', imageUrl: 'https://picsum.photos/seed/gal3/800/600', caption: 'Prayer flags at Khardung La', category: 'Culture' },
    { id: 'gal4', imageUrl: 'https://picsum.photos/seed/gal4/800/600', caption: 'The stunning Pangong Tso', category: 'Landscapes' },
    { id: 'gal5', imageUrl: 'https://picsum.photos/seed/gal5/800/600', caption: 'Our mechanic at work', category: 'Behind the Scenes' },
    { id: 'gal6', imageUrl: 'https://picsum.photos/seed/gal6/600/800', caption: 'Monks at Thiksey Monastery', category: 'Culture' },
    { id: 'gal7', imageUrl: 'https://picsum.photos/seed/gal7/800/600', caption: 'The group ready to roll out', category: 'Riders' },
    { id: 'gal8', imageUrl: 'https://picsum.photos/seed/gal8/800/600', caption: 'Sunset over the Indus Valley', category: 'Landscapes' },
    { id: 'gal9', imageUrl: 'https://picsum.photos/seed/gal9/600/800', caption: 'Bactrian Camel in Nubra', category: 'Culture' },
    { id: 'gal10', imageUrl: 'https://picsum.photos/seed/gal10/800/600', caption: 'Morning briefing with the team', category: 'Behind the Scenes' },
    { id: 'gal11', imageUrl: 'https://picsum.photos/seed/gal11/800/600', caption: 'Conquering the Gata Loops', category: 'Riders' },
    { id: 'gal12', imageUrl: 'https://picsum.photos/seed/gal12/800/600', caption: 'The surreal landscapes of Lamayuru', category: 'Landscapes' },
];

export const instagramPosts: InstagramPost[] = [
    { id: 'insta1', imageUrl: 'https://picsum.photos/seed/insta1/500/500', type: 'photo', likes: 1248, comments: 32 },
    { id: 'insta2', imageUrl: 'https://picsum.photos/seed/insta2/500/500', type: 'reel', likes: 5320, comments: 112 },
    { id: 'insta3', imageUrl: 'https://picsum.photos/seed/insta3/500/500', type: 'photo', likes: 2109, comments: 54 },
    { id: 'insta4', imageUrl: 'https://picsum.photos/seed/insta4/500/500', type: 'photo', likes: 1876, comments: 41 },
    { id: 'insta5', imageUrl: 'https://picsum.photos/seed/insta5/500/500', type: 'photo', likes: 1566, comments: 38 },
    { id: 'insta6', imageUrl: 'https://picsum.photos/seed/insta6/500/500', type: 'reel', likes: 8910, comments: 251 },
    { id: 'insta7', imageUrl: 'https://picsum.photos/seed/insta7/500/500', type: 'photo', likes: 2453, comments: 67 },
    { id: 'insta8', imageUrl: 'https://picsum.photos/seed/insta8/500/500', type: 'photo', likes: 1982, comments: 45 },
];

export const instagramSyncMock: { photo: Omit<GalleryPhoto, 'id'>, post: Omit<InstagramPost, 'id'> }[] = [
    {
        photo: {
            imageUrl: 'https://picsum.photos/seed/synced-insta1/800/600',
            caption: 'Freshly synced from the road!',
            category: 'Landscapes'
        },
        post: {
            imageUrl: 'https://picsum.photos/seed/synced-insta1/500/500',
            type: 'photo',
            likes: 1337,
            comments: 42
        }
    },
    {
        photo: {
            imageUrl: 'https://picsum.photos/seed/synced-insta2/600/800',
            caption: 'Another adventure just captured.',
            category: 'Riders'
        },
        post: {
            imageUrl: 'https://picsum.photos/seed/synced-insta2/500/500',
            type: 'reel',
            likes: 9876,
            comments: 321
        }
    }
];

export const googleReviews: GoogleReview[] = [
    {
        id: 'gr1',
        authorName: 'Aarav Sharma',
        rating: 5,
        text: 'An absolutely unforgettable journey through Ladakh! The team at Revrom.in are true locals and their expertise is unmatched. The bikes were in perfect condition, the accommodation was fantastic, and the routes were breathtaking. This is the only way to see the Himalayas.',
        profilePhotoUrl: 'https://i.pravatar.cc/150?u=aaron',
        isFeatured: true
    },
    {
        id: 'gr2',
        authorName: 'Priya Patel',
        rating: 5,
        text: 'As a solo female rider, safety and reliability were my top concerns. The Revrom team exceeded all my expectations. The guide was incredibly supportive, the mechanic was a wizard, and I felt secure throughout the entire trip. The Spiti valley tour was tough but so rewarding. Highly recommend!',
        profilePhotoUrl: 'https://i.pravatar.cc/150?u=priya',
        isFeatured: true
    },
    {
        id: 'gr3',
        authorName: 'Daniel Johnson',
        rating: 4,
        text: 'Great trip overall. The landscapes are obviously 10/10. The only reason for 4 stars is the food at one of the camps was a bit basic, but given the remote location, it\'s understandable. The riding itself was phenomenal. Would ride with them again.',
        profilePhotoUrl: 'https://i.pravatar.cc/150?u=daniel',
        isFeatured: false
    },
    {
        id: 'gr4',
        authorName: 'Mei Lin',
        rating: 5,
        text: 'We booked a custom tour for our group of 6, and it was the adventure of a lifetime. Tashi and his team tailored the itinerary perfectly to our skill level and interests. Their local knowledge from Chushul gave us access to places and stories we would have never found on our own. It felt like we were riding with family. Thank you, Revrom!',
        profilePhotoUrl: 'https://i.pravatar.cc/150?u=mei',
        isFeatured: true
    }
];

export const itineraryQueries: ItineraryQuery[] = [];

export const customPages: CustomPage[] = [
    {
        id: 'page-1',
        title: 'Visa Information',
        slug: 'visa-information',
        content: '# Visa Information for India\n\nTravelers from most countries require a visa to enter India. You can apply for an e-Visa online.\n\n## Required Documents\n* Passport valid for 6 months\n* Recent photo\n* Return ticket',
        isVisible: true,
        imageUrl: 'https://picsum.photos/seed/visa/800/300',
        seo: {
            title: 'India E-Visa Information for Travelers',
            description: 'Complete guide to obtaining an Indian e-Visa for your motorcycle tour. Requirements, documents, and process explained.',
            keywords: 'india visa, e-visa india, travel visa, indian visa requirements',
            ogImage: 'https://picsum.photos/seed/visa/1200/630'
        }
    }
];

export const siteContent: SiteContent = {
    heroTitle: "Ride Through The Himalayas",
    heroSubtitle: "Unforgettable Motorcycle Journeys.",
    adventuresTitle: "Our Adventures",
    adventuresSubtitle: "Find the perfect ride. Filter by destination, duration, and difficulty.",
    departuresTitle: "Upcoming Departures",
    customizeTitle: "Can't Find Your Perfect Tour?",
    customizeSubtitle: "Let us craft a bespoke Himalayan adventure just for you. From custom routes to private groups, we can tailor an experience to your exact needs.",
    rootsTitle: "Our Roots: The Spirit of Chushul",
    rootsBody: "We are not just another travel company. Our team hails from the extreme frontier village of Chushul, Ladakh. Our legacy is intertwined with the valor of Rezang La and the commanding views from Chushul Heights. This deep connection to the land gives us a unique perspective, allowing us to share the most authentic Himalayan experiences with you.",
    rootsButton: "Read Our Story",
    blogTitle: "Latest From Our Blog",
    galleryTitle: "Explore Our Gallery",
    gallerySubtitle: "A glimpse into the breathtaking landscapes and unforgettable moments from our tours.",
    instagramTitle: "Follow Our Adventures",
    instagramSubtitle: "Join our community on Instagram for live stories, reels, and rider features from the road.",
    
    // Social Media Defaults
    instagramUrl: "https://www.instagram.com/revrom.in",
    facebookUrl: "https://www.facebook.com/revrom.in",
    youtubeUrl: "https://www.youtube.com/@revrom.in",
    googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJN1t_tDeuEmsRUsoyG83frY4",
    
    // Contact Info Defaults
    adminWhatsappNumber: "919876543210",
    contactEmail: "contact@revrom.in",
    contactPhone: "+91 987 654 3210",
    contactAddress: "Fort Road, Leh, Ladakh, 194101, India",

    // Footer/Brand Defaults
    logoUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAABFCAMAAAC3zTykAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAPUExURf///87Ozv///83NzbS0tAC53v4AAAMESURBVGFjYIAEAAAA//8AIAABAAAAAADgIQNuAACBlAX+iIAnAAAAAElFTkSuQmCC",
    logoHeight: 64,
    footerTagline: "Unforgettable Motorcycle Adventures in the Heart of the Himalayas.",
    
    activeTheme: 'Default',
    customThemeColors: themes.find(t => t.name === 'Default')!.colors as ThemeColors,
    homePageLayout: [
        { id: 'HERO', isVisible: true, label: 'Hero Section' },
        { id: 'ADVENTURES', isVisible: true, label: 'Tours Grid' },
        { id: 'DEPARTURES', isVisible: true, label: 'Departure Dates' },
        { id: 'CUSTOMIZE', isVisible: true, label: 'Customize CTA' },
        { id: 'WHY_CHOOSE_US', isVisible: true, label: 'Features / Why Us' },
        { id: 'ROOTS', isVisible: true, label: 'About / Roots' },
        { id: 'REVIEWS', isVisible: true, label: 'Testimonials' },
        { id: 'BLOG', isVisible: true, label: 'Blog Posts' },
        { id: 'GALLERY', isVisible: true, label: 'Photo Gallery' },
        { id: 'INSTAGRAM', isVisible: true, label: 'Instagram Feed' },
    ],
    globalSeo: {
        title: 'Revrom.in | Ride. Roam. Relax. | Himalayan Motorcycle Tours',
        description: 'Experience the thrill of the Himalayas with Revrom.in. Premium motorcycle tours in Ladakh, Spiti, and Kashmir. Book your adventure today.',
        keywords: 'motorcycle tours, ladakh bike trip, himalayan adventures, bike rentals leh, spiti valley bike tour'
    }
};
