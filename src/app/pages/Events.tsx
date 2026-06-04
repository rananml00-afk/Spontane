import { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase/client';
import { MapPin, Calendar, Users, Search, ChevronDown, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { EventItem } from '../data/events';

// ─── Gradient variants ────────────────────────────────────────────────────────
const CARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(192,145,63,0.18) 0%, rgba(192,145,63,0.42) 100%)',
  'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
  'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
];

const MONTH_MAP: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function parseEventDate(str: string): Date {
  const [day, month, year] = str.split(' ');
  return new Date(parseInt(year), MONTH_MAP[month] ?? 0, parseInt(day));
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-6 space-y-3">
        <div className="h-3 rounded-full skeleton w-1/3" />
        <div className="h-5 rounded-full skeleton w-3/4" />
        <div className="h-3 rounded-full skeleton w-1/2" />
        <div className="h-3 rounded-full skeleton w-2/3" />
        <div className="h-3 rounded-full skeleton w-1/2" />
        <div className="mt-4 h-11 rounded-xl skeleton" />
      </div>
    </div>
  );
}

// ─── Filter dropdown chip ─────────────────────────────────────────────────────
function FilterDropdown({
  label, options, value, onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = !!value;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
          active
            ? 'border-[#c0913f] bg-[#fdf3e3] text-[#c0913f]'
            : 'border-gray-200 bg-white text-gray-700 hover:border-yellow-500/50 hover:bg-[#fdf3e3]'
        }`}
      >
        {value || label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: active ? '#c0913f' : '#9ca3af' }} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 min-w-[160px]">
          {value && (
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-50"
            >
              Clear filter
            </button>
          )}
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                value === opt
                  ? 'font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={value === opt ? { color: '#c0913f' } : {}}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Date filter chip ─────────────────────────────────────────────────────────
function DateFilterChip({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const active = !!value;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
          active
            ? 'border-[#c0913f] bg-[#fdf3e3] text-[#c0913f]'
            : 'border-gray-200 bg-white text-gray-700 hover:border-yellow-500/50 hover:bg-[#fdf3e3]'
        }`}
      >
        {value ? `From ${value}` : 'Date'}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: active ? '#c0913f' : '#9ca3af' }} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 z-20 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 min-w-[220px]">
          <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Show events from</p>
          <input
            type="date"
            value={value}
            onChange={(e) => { onChange(e.target.value); }}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#c0913f]"
          />
          {value && (
            <button onClick={() => { onChange(''); setOpen(false); }} className="mt-2 text-xs text-gray-400 hover:text-gray-600 w-full text-left">
              Clear date
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Event card ───────────────────────────────────────────────────────────────
function EventCard({
  event, index, saved, onToggleSave,
}: {
  event: EventItem;
  index: number;
  saved: boolean;
  onToggleSave: (id: number | string) => void;
}) {
  const gradient = CARD_GRADIENTS[index % 3];

  return (
    <div
      className="bg-white rounded-3xl border border-black/5 shadow-sm flex flex-col overflow-hidden
                 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl animate-fade-in-up"
      style={{ animationDelay: `${0.1 + index * 0.07}s` }}
    >
      {/* Image / gradient area */}
      <div className="relative h-48 flex-shrink-0" style={{ background: gradient }}>
        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/60 backdrop-blur-md text-gray-800">
          {event.category}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); onToggleSave(event.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label={saved ? 'Remove from saved' : 'Save event'}
        >
          <Heart
            className="h-4 w-4 transition-all"
            style={{ color: saved ? '#c0913f' : 'rgba(30,30,30,0.7)', fill: saved ? '#c0913f' : 'none', strokeWidth: 1.8 }}
          />
        </button>
        <span
          className="absolute bottom-3 right-4 text-4xl font-bold select-none pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Playfair Display', serif" }}
        >
          {event.city}
        </span>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <h3
          className="text-xl font-medium leading-tight mb-1"
          style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
        >
          {event.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: '#717182' }}>by {event.organizer}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#c0913f' }} />
            <span className="text-sm text-gray-700">{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#c0913f' }} />
            <span className="text-sm text-gray-700">{event.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 flex-shrink-0" style={{ color: '#c0913f' }} />
            <span className="text-sm text-gray-700">{event.participants} / {event.maxParticipants} participants</span>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed flex-1 mb-8"
          style={{
            color: '#717182',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          } as React.CSSProperties}
        >
          {event.description}
        </p>

        <Link
          to={`/events/${event.id}`}
          className="mt-auto block w-full text-center text-sm font-medium text-white py-3.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          style={{ backgroundColor: '#c0913f' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function Events() {
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [savedIds, setSavedIds] = useState<Set<number | string>>(new Set());
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbEvents, setDbEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .gte('date', today)
          .order('date', { ascending: true });
        if (!error && data) {
          const mapped: EventItem[] = data.map((row) => ({
            id: row.id as string,
            category: row.category || 'Other',
            title: row.title,
            organizer: 'Community Member',
            date: row.date ? new Date(row.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBD',
            time: row.time || '',
            city: row.city || '',
            country: '',
            participants: 0,
            maxParticipants: 50,
            description: row.description || '',
            price: 'Free',
            language: row.language || '',
            imageUrl: row.image_url || '',
          }));
          setDbEvents(mapped);
        }
      } catch { /* silently fail */ }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const toggleSave = (id: number | string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const hasActiveFilters = !!(filterCity || filterCategory || filterLanguage || filterDate || search);

  const clearAll = () => {
    setSearch(''); setFilterCity(''); setFilterCategory('');
    setFilterLanguage(''); setFilterDate(''); setShowSaved(false);
  };

  const cityOptions = [...new Set(dbEvents.map((e) => e.city))].sort();
  const categoryOptions = [...new Set(dbEvents.map((e) => e.category))].sort();
  const languageOptions = [...new Set(dbEvents.flatMap((e) => e.language.split(' / ').map((l) => l.trim())))].sort();

  const allEvents = dbEvents;
  const filtered = allEvents.filter((e) => {
    if (showSaved && !savedIds.has(e.id)) return false;

    if (search) {
      const q = search.toLowerCase();
      const matches = e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.language.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q);
      if (!matches) return false;
    }
    if (filterCity && e.city !== filterCity) return false;
    if (filterCategory && e.category !== filterCategory) return false;
    if (filterLanguage && !e.language.includes(filterLanguage)) return false;
    if (filterDate) {
      const from = new Date(filterDate);
      const eventDate = parseEventDate(e.date);
      if (eventDate < from) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">

        {/* ── Zone 1: Centred header + search ── */}
        <div className="text-center mb-10 animate-fade-in-up" style={{ animationDelay: '0s' }}>
          <h1
            className="text-5xl font-medium mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Discover Events
          </h1>
          <p className="text-lg font-light text-gray-500 mb-8 max-w-2xl mx-auto">
            Join curated gatherings in your city and practice languages in a natural, immersive environment.
          </p>

          {/* Search bar — centred, max-w-2xl */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for events, languages, or cities..."
                className="w-full py-4 pl-12 pr-6 rounded-full bg-white border border-gray-200 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:border-[#c0913f] transition-all"
                onFocus={(e) => { e.target.style.boxShadow = '0 0 0 2px rgba(192,145,63,0.4)'; }}
                onBlur={(e) => { e.target.style.boxShadow = ''; }}
              />
            </div>
          </div>
        </div>

        {/* ── Zone 2: Centred filter chips ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <FilterDropdown label="City"     options={cityOptions}     value={filterCity}     onChange={setFilterCity} />
          <FilterDropdown label="Category" options={categoryOptions} value={filterCategory} onChange={setFilterCategory} />
          <FilterDropdown label="Language" options={languageOptions} value={filterLanguage} onChange={setFilterLanguage} />
          <DateFilterChip value={filterDate} onChange={setFilterDate} />

          {/* Saved toggle */}
          <button
            onClick={() => setShowSaved((s) => !s)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium shadow-sm transition-all duration-200 ${
              showSaved
                ? 'border-[#c0913f] bg-[#fdf3e3] text-[#c0913f]'
                : 'border-gray-200 bg-white text-gray-700 hover:border-yellow-500/50 hover:bg-[#fdf3e3]'
            }`}
          >
            <Heart className="h-4 w-4" style={{ fill: showSaved ? '#c0913f' : 'none', color: showSaved ? '#c0913f' : '#9ca3af', strokeWidth: 1.8 }} />
            Saved{savedIds.size > 0 && <span className="ml-0.5">({savedIds.size})</span>}
          </button>

          {hasActiveFilters && (
            <button onClick={clearAll} className="px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              Clear all
            </button>
          )}
        </div>

        {/* Result count */}
        {!loading && (
          <p className="text-center text-sm text-gray-400 mb-8">
            {filtered.length === allEvents.length
              ? `${allEvents.length} event${allEvents.length !== 1 ? 's' : ''}`
              : `${filtered.length} of ${allEvents.length} events`}
          </p>
        )}

        {/* ── Zone 3: Event grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [0, 1, 2].map((i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <p className="text-gray-400 text-lg mb-3">
                {showSaved ? 'No saved events yet.' : hasActiveFilters ? 'No events match your filters.' : 'No upcoming events yet.'}
              </p>
              {hasActiveFilters && (
                <button onClick={clearAll} className="text-sm underline" style={{ color: '#c0913f' }}>
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            filtered.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                saved={savedIds.has(event.id)}
                onToggleSave={toggleSave}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
