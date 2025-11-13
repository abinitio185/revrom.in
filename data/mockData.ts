import type { Trip, Departure, Review, BlogPost, GalleryPhoto, InstagramPost } from '../types';

export const trips: Trip[] = [
  {
    id: 'ladakh-manali-leh',
    title: 'The Manali-Leh Conquest',
    destination: 'Ladakh, India',
    shortDescription: 'Conquer two of the world\'s highest motorable passes on this epic journey from Manali to Leh.',
    longDescription: '### The Ultimate Himalayan Odyssey\n\nEmbark on the ultimate Himalayan odyssey. This classic motorcycle expedition takes you from the lush green valleys of Manali to the arid, high-altitude desert of Ladakh. You will traverse treacherous passes, including the famed Khardung La, witness breathtaking landscapes, and immerse yourself in the unique culture of the region.\n\nThis is more than a tour; it\'s a rite of passage for any serious adventure rider.\n\n#### What to Expect\n* **Epic Roads:** Conquer some of the world\'s highest motorable passes.\n* **Stunning Scenery:** From green valleys to barren high-altitude deserts.\n* **Cultural Immersion:** Visit ancient monasteries and experience Ladakhi culture.\n* **A True Challenge:** A test of skill and endurance for any rider.',
    duration: 12,
    price: 3200,
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
    reviews: [
      { name: 'Alex R.', rating: 5, comment: 'An absolutely life-changing experience. The views were surreal and the Royal Enfield was a dream to ride. The team took care of everything. Highly recommended!', date: '2024-06-15' },
      { name: 'Samantha B.', rating: 4, comment: 'Incredible journey, but be prepared for the altitude! The roads are challenging but rewarding. The support crew was fantastic.', date: '2024-06-20' },
    ]
  },
  {
    id: 'ladakh-nubra-valley',
    title: 'Nubra Valley Expeditions',
    destination: 'Ladakh, India',
    shortDescription: 'Explore the enigmatic cold desert of Nubra Valley, ride camels, and visit ancient monasteries.',
    longDescription: '### A Journey to the Land of Contrasts\n\nDiscover a land of contrasts on this tour to the Nubra Valley. Separated from the Indus Valley by the mighty Khardung La, Nubra is a serene desert oasis with lush villages, ancient monasteries, and the famous double-humped Bactrian camels.\n\n#### Highlights of the Expedition\n* **Khardung La Pass:** Ride over one of the world\'s highest motorable roads.\n* **Desert Oasis:** Explore the unique sand dunes of Hunder at high altitude.\n* **Bactrian Camels:** Enjoy a ride on the rare double-humped camels.\n* **Diskit Monastery:** Visit the oldest and largest monastery in Nubra Valley, with its iconic Maitreya Buddha statue.\n\nThis tour offers a perfect blend of manageable adventure riding and rich cultural exploration, ideal for those looking to experience the best of Ladakh in a shorter timeframe.',
    duration: 7,
    price: 1950,
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
    reviews: [
        { name: 'John D.', rating: 5, comment: 'Perfect trip for someone with limited time. Khardung La was the highlight, and the camels in Hunder were a unique experience. Well organized.', date: '2024-07-05' },
    ]
  },
  {
    id: 'ladakh-changthang-lakes',
    title: 'High Passes of Changthang',
    destination: 'Ladakh, India',
    shortDescription: 'An adventurous ride through the remote Changthang plateau, visiting the high-altitude lakes of Pangong and Tso Moriri.',
    longDescription: '### A Ride into the Wild Heart of Ladakh\n\nFor the seasoned rider seeking solitude and raw beauty, this tour explores the remote Changthang region. This high-altitude plateau is a land of vast open spaces, home to nomadic shepherds, rare wildlife, and the mesmerizingly beautiful lakes of Pangong Tso and Tso Moriri.\n\nIt\'s a challenging ride through some of the most isolated and stunning landscapes on earth.\n\n#### Key Highlights\n* **Remote Wilderness:** Experience the untouched beauty of the Changthang plateau.\n* **High-Altitude Lakes:** Witness the breathtaking azure waters of Pangong Tso and Tso Moriri.\n* **Unique Wildlife:** Spot rare species like the Kyang (Tibetan wild ass) and the black-necked crane.\n* **Nomadic Culture:** Get a glimpse into the life of the Changpa nomads.',
    duration: 9,
    price: 2500,
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
    reviews: [
      { name: 'Maria S.', rating: 5, comment: 'This is the real deal for adventure seekers. The landscapes are otherworldly. Tough ride, but worth every moment. The team was exceptional, especially our mechanic.', date: '2024-08-01' },
      { name: 'Kenji T.', rating: 5, comment: 'Mind-blowing beauty and solitude. Tso Moriri was a spiritual experience. Not for the faint of heart, but if you are an experienced rider, do not miss this.', date: '2024-08-05' },
    ]
  },
];

export const departures: Departure[] = [
    { id: 'dep1', tripId: 'ladakh-manali-leh', startDate: '2024-07-15', endDate: '2024-07-26', slots: 4, status: 'Limited' },
    { id: 'dep2', tripId: 'ladakh-manali-leh', startDate: '2024-08-10', endDate: '2024-08-21', slots: 8, status: 'Available' },
    { id: 'dep3', tripId: 'ladakh-nubra-valley', startDate: '2024-07-20', endDate: '2024-07-26', slots: 0, status: 'Sold Out' },
    { id: 'dep4', tripId: 'ladakh-nubra-valley', startDate: '2024-08-05', endDate: '2024-08-11', slots: 6, status: 'Available' },
    { id: 'dep5', tripId: 'ladakh-changthang-lakes', startDate: '2024-09-01', endDate: '2024-09-09', slots: 5, status: 'Available' },
    { id: 'dep6', tripId: 'ladakh-changthang-lakes', startDate: '2024-09-15', endDate: '2024-09-23', slots: 2, status: 'Limited' },
];

export const blogPosts: BlogPost[] = [
    {
        id: 'blog-1',
        title: 'Top 5 Must-See Monasteries in Ladakh',
        author: 'Rider Jane',
        date: '2024-05-20',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog1/800/600',
        excerpt: 'Ladakh is not just about thrilling roads; it\'s a land of deep spiritual heritage. Discover the most breathtaking monasteries that you cannot miss on your journey.',
        content: 'Ladakh, often called "Little Tibet", is renowned for its stunning monasteries or "gompas". Perched on hilltops, these centers of Buddhist learning offer peace and spectacular views. Here are our top 5 picks:\n\n**1. Thiksey Monastery:** Affiliated with the Gelug sect of Tibetan Buddhism, it is noted for its resemblance to the Potala Palace in Lhasa, Tibet. The 12-story complex houses many items of Buddhist art such as stupas, statues, thangkas, wall paintings and swords.\n\n**2. Hemis Monastery:** The wealthiest monastery in Ladakh, Hemis is famous for its annual Hemis festival honoring Padmasambhava. It\'s a must-visit for its rich collection of ancient relics.\n\n**3. Diskit Monastery:** Located in the beautiful Nubra Valley, Diskit is the oldest and largest monastery in the region. The highlight is the 32-meter tall statue of Maitreya Buddha, which offers panoramic views of the valley.\n\n**4. Alchi Monastery:** Situated on the banks of the Indus River, Alchi is unique for its flat-ground location and magnificent Kashmiri-influenced wall paintings, some of which date back to the 11th century.\n\n**5. Lamayuru Monastery:** One of the oldest monasteries, Lamayuru is famous for its "moonland" landscape. The monastery is home to around 150 monks and features a rich collection of thangkas and artifacts.'
    },
    {
        id: 'blog-2',
        title: 'Acclimatization 101: Riding High and Staying Healthy',
        author: 'Dr. Adventure',
        date: '2024-06-02',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog2/800/600',
        excerpt: 'High altitude can be a challenge. Learn the essential tips for proper acclimatization to ensure your Ladakh motorcycle tour is safe and enjoyable.',
        content: 'Riding in Ladakh means dealing with altitudes often exceeding 3,500 meters (11,500 feet). Acute Mountain Sickness (AMS) is a real risk. Here’s how to minimize it:\n\n**1. Go Slow:** Your first day in Leh should be all about rest. Avoid strenuous activity. Let your body adjust.\n\n**2. Hydrate, Hydrate, Hydrate:** Drink plenty of water, at least 3-4 liters a day. Avoid alcohol and caffeine as they can dehydrate you.\n\n**3. Eat Well:** Consume a high-carbohydrate diet. It helps your body use oxygen more efficiently.\n\n**4. Ascend Gradually:** Plan your itinerary to include gradual ascent. Never ascend more than 500 meters per day to sleep.\n\n**5. Know the Symptoms:** Headaches, dizziness, nausea, and shortness of breath are early signs of AMS. If you feel them, do not ascend further. Rest, and if they persist, descend.\n\nBy taking these precautions, you can enjoy the majestic beauty of Ladakh without compromising your health.'
    },
    {
        id: 'blog-3',
        title: 'Packing for a Ladakh Moto Tour: The Ultimate Checklist',
        author: 'Gearhead Mike',
        date: '2024-06-18',
        imageUrl: 'https://picsum.photos/seed/ladakh-blog3/800/600',
        excerpt: 'What to pack and what to leave behind? Our ultimate checklist, forged from years of experience, will help you prepare for the ride of a lifetime.',
        content: 'Packing right is crucial for a successful Ladakh trip. The weather can be unpredictable. Here’s a quick guide:\n\n**Riding Gear (Non-negotiable):**\n- Full-face helmet\n- Armored riding jacket and pants\n- Sturdy, over-the-ankle riding boots\n- Riding gloves (consider both summer and thermal pairs)\n\n**Clothing:**\n- Thermal base layers\n- Fleece or down mid-layer\n- T-shirts and comfortable pants for evenings\n- Woolen socks\n\n**Essentials:**\n- Sunscreen (SPF 50+)\n- Sunglasses (UV protection)\n- Lip balm with SPF\n- Personal first-aid kit with medication for AMS (consult your doctor)\n- Reusable water bottle\n\nRemember, layering is key. It allows you to adapt to the changing temperatures throughout the day.'
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