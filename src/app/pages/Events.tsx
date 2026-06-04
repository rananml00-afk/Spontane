import { useState } from 'react';
import { MapPin, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

const CATEGORIES = ['All', 'Language Exchange', 'Culture', 'Professional', 'Networking', 'Sports', 'Travel'];

interface Event {
  id: number;
  image: string;
  category: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  city: string;
  country: string;
  participants: number;
  maxParticipants: number;
  description: string;
  price: string;
  language: string;
}

const EVENTS: Event[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=360&fit=crop&auto=format',
    category: 'Language Exchange',
    title: 'Sprachcafé Frankfurt',
    organizer: 'Sarah Müller',
    date: '25 June 2026',
    time: '18:00',
    city: 'Frankfurt',
    country: 'Germany',
    participants: 18,
    maxParticipants: 30,
    description: 'Join native speakers and language learners for an informal evening of conversation and networking in German and English.',
    price: 'Free',
    language: 'German / English',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=360&fit=crop&auto=format',
    category: 'Culture',
    title: 'Flamenco & Tapas Night',
    organizer: 'Isabella Torres',
    date: '28 June 2026',
    time: '19:30',
    city: 'Barcelona',
    country: 'Spain',
    participants: 22,
    maxParticipants: 40,
    description: 'Experience authentic Flamenco performances followed by a guided tapas tasting. A perfect blend of Spanish music, dance, and gastronomy.',
    price: '€12',
    language: 'Spanish / English',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=360&fit=crop&auto=format',
    category: 'Professional',
    title: 'Berlin Tech Meetup',
    organizer: 'Markus Weber',
    date: '30 June 2026',
    time: '17:00',
    city: 'Berlin',
    country: 'Germany',
    participants: 35,
    maxParticipants: 60,
    description: 'Monthly gathering of developers, designers, and founders. Share your projects, find co-founders, and learn from short lightning talks.',
    price: 'Free',
    language: 'English / German',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=360&fit=crop&auto=format',
    category: 'Networking',
    title: 'International Networking Evening',
    organizer: 'Emma Schneider',
    date: '2 July 2026',
    time: '19:00',
    city: 'Munich',
    country: 'Germany',
    participants: 41,
    maxParticipants: 80,
    description: 'Meet expats, locals, and travellers from over 20 countries. Structured networking rounds and free mingling in a relaxed rooftop setting.',
    price: '€8',
    language: 'English',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=360&fit=crop&auto=format',
    category: 'Sports',
    title: 'Sunday Hiking Group – Taunus',
    organizer: 'Lukas Hartmann',
    date: '5 July 2026',
    time: '09:00',
    city: 'Frankfurt',
    country: 'Germany',
    participants: 12,
    maxParticipants: 20,
    description: 'A relaxed 12km hike through the Taunus hills. All fitness levels welcome. Great opportunity to meet people and enjoy nature together.',
    price: 'Free',
    language: 'German / English',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=600&h=360&fit=crop&auto=format',
    category: 'Travel',
    title: 'Weekend Trip to Prague',
    organizer: 'Marie Dubois',
    date: '10 July 2026',
    time: '07:00',
    city: 'Prague',
    country: 'Czech Republic',
    participants: 9,
    maxParticipants: 15,
    description: 'Two-day group trip to Prague. Includes guided old town walk, local food tour, and free time to explore. Accommodation arranged separately.',
    price: '€45',
    language: 'English / French',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&h=360&fit=crop&auto=format',
    category: 'Language Exchange',
    title: 'Italian Coffee Chat',
    organizer: 'Marco Rossi',
    date: '12 July 2026',
    time: '10:30',
    city: 'Vienna',
    country: 'Austria',
    participants: 7,
    maxParticipants: 12,
    description: 'Casual morning coffee with Italian speakers and learners. Practice conversational Italian in a cozy café over espresso and pastries.',
    price: 'Free',
    language: 'Italian / English',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=360&fit=crop&auto=format',
    category: 'Culture',
    title: 'French Film Night',
    organizer: 'Amélie Fontaine',
    date: '14 July 2026',
    time: '20:00',
    city: 'Paris',
    country: 'France',
    participants: 28,
    maxParticipants: 50,
    description: 'Screening of a classic French film followed by a discussion in both French and English. Wine and cheese provided.',
    price: '€5',
    language: 'French / English',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=360&fit=crop&auto=format',
    category: 'Professional',
    title: 'Startup Founders Lunch',
    organizer: 'Nina Braun',
    date: '16 July 2026',
    time: '12:30',
    city: 'Amsterdam',
    country: 'Netherlands',
    participants: 14,
    maxParticipants: 25,
    description: 'Intimate lunch for early-stage founders. Share challenges, swap insights, and build lasting connections in the European startup scene.',
    price: '€15',
    language: 'English',
  },
];

const CITIES = ['All Cities', 'Frankfurt', 'Barcelona', 'Berlin', 'Munich', 'Vienna', 'Prague', 'Paris', 'Amsterdam'];
const LANGUAGES_LIST = ['All Languages', 'English', 'German', 'French', 'Spanish', 'Italian', 'Turkish'];
const PRICES = ['Any Price', 'Free', 'Under €10', 'Under €20', 'Under €50'];

const CATEGORY_COLORS: Record<string, string> = {
  'Language Exchange': 'bg-blue-50 text-blue-700',
  'Culture': 'bg-purple-50 text-purple-700',
  'Professional': 'bg-gray-100 text-gray-700',
  'Networking': 'bg-green-50 text-green-700',
  'Sports': 'bg-orange-50 text-orange-700',
  'Travel': 'bg-teal-50 text-teal-700',
};

export function Events() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchCity, setSearchCity] = useState('');
  const [filterCity, setFilterCity] = useState('All Cities');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLanguage, setFilterLanguage] = useState('All Languages');
  const [filterPrice, setFilterPrice] = useState('Any Price');
  const [filterDate, setFilterDate] = useState('');

  const filteredEvents = EVENTS.filter((event) => {
    const matchesCategory =
      activeCategory === 'All' || event.category === activeCategory;
    const matchesFilterCategory =
      filterCategory === 'All' || event.category === filterCategory;
    const matchesCity =
      filterCity === 'All Cities' ||
      event.city.toLowerCase().includes(filterCity.toLowerCase());
    const matchesSearch =
      !searchCity ||
      event.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      event.title.toLowerCase().includes(searchCity.toLowerCase());
    const matchesLanguage =
      filterLanguage === 'All Languages' ||
      event.language.toLowerCase().includes(filterLanguage.toLowerCase());
    const matchesPrice =
      filterPrice === 'Any Price' ||
      (filterPrice === 'Free' && event.price === 'Free') ||
      (filterPrice === 'Under €10' &&
        (event.price === 'Free' ||
          (event.price.startsWith('€') && parseFloat(event.price.slice(1)) < 10))) ||
      (filterPrice === 'Under €20' &&
        (event.price === 'Free' ||
          (event.price.startsWith('€') && parseFloat(event.price.slice(1)) < 20))) ||
      (filterPrice === 'Under €50' &&
        (event.price === 'Free' ||
          (event.price.startsWith('€') && parseFloat(event.price.slice(1)) < 50)));

    return (
      matchesCategory &&
      matchesFilterCategory &&
      matchesCity &&
      matchesSearch &&
      matchesLanguage &&
      matchesPrice
    );
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span
            className="inline-block text-xs uppercase tracking-widest font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: '#fdf3e3', color: '#c0913f' }}
          >
            Community Events
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Discover Events Near You
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Connect with language learners, locals, and travellers through unique experiences across Europe.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search city or event..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600/40 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div className="relative">
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Category */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Language */}
            <div className="relative">
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {LANGUAGES_LIST.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Price */}
            <div className="relative">
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none cursor-pointer"
              >
                {PRICES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Date */}
            <div className="relative">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="pl-4 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Category Tab Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat
                  ? 'text-white border-transparent shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              style={
                activeCategory === cat
                  ? { backgroundColor: '#c0913f', borderColor: '#c0913f' }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing <span className="font-semibold text-gray-700">{filteredEvents.length}</span> events
        </p>

        {/* Event Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">No events match your filters.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setFilterCity('All Cities');
                setFilterCategory('All');
                setFilterLanguage('All Languages');
                setFilterPrice('Any Price');
                setFilterDate('');
                setSearchCity('');
              }}
              className="mt-4 text-sm underline"
              style={{ color: '#c0913f' }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const participantPct = (event.participants / event.maxParticipants) * 100;
  const almostFull = participantPct >= 80;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Price badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow"
          style={{ backgroundColor: event.price === 'Free' ? '#2d7a45' : '#c0913f' }}
        >
          {event.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <span
          className={`inline-block self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${
            CATEGORY_COLORS[event.category] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {event.category}
        </span>

        {/* Title */}
        <h3
          className="text-lg font-bold text-gray-900 mb-1 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {event.title}
        </h3>

        {/* Organizer */}
        <p className="text-sm text-gray-500 mb-3">By {event.organizer}</p>

        {/* Meta info */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 flex-shrink-0" style={{ color: '#c0913f' }} />
            <span>{event.date} | {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: '#c0913f' }} />
            <span>{event.city}, {event.country}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 flex-shrink-0" style={{ color: almostFull ? '#d97706' : '#c0913f' }} />
            <span className={almostFull ? 'text-amber-600 font-medium' : ''}>
              {event.participants}/{event.maxParticipants} participants
              {almostFull && ' · Almost full'}
            </span>
          </div>
        </div>

        {/* Participant progress bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full mb-4">
          <div
            className="h-1 rounded-full transition-all"
            style={{
              width: `${participantPct}%`,
              backgroundColor: almostFull ? '#d97706' : '#c0913f',
            }}
          />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
          {event.description}
        </p>

        {/* CTA */}
        <Button
          className="w-full text-white font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity mt-auto"
          style={{ backgroundColor: '#c0913f' }}
        >
          Join Event
        </Button>
      </div>
    </div>
  );
}
