import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';
import { EventItem } from '../data/events';
import { useParams, Link } from 'react-router';
import { ChevronLeft, Clock, MapPin, Users, Type } from 'lucide-react';
import { EVENTS } from '../data/events';

const CARD_GRADIENTS = [
  'linear-gradient(135deg, rgba(192,145,63,0.18) 0%, rgba(192,145,63,0.42) 100%)',
  'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
  'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const isUuid = UUID_RE.test(id || '');
  const mockEvent = isUuid ? undefined : EVENTS.find((e) => e.id === Number(id));
  const [event, setEvent] = useState<EventItem | undefined>(mockEvent);
  const [loadingEvent, setLoadingEvent] = useState(isUuid);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState(mockEvent?.participants ?? 0);

  useEffect(() => {
    if (!isUuid) return;
    supabase.from('events').select('*').eq('id', id!).maybeSingle().then(({ data }) => {
      if (data) {
        const mapped: EventItem = {
          id: data.id,
          category: data.category || 'Other',
          title: data.title,
          organizer: 'Community Member',
          date: data.date ? new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'TBD',
          time: data.time || '',
          city: data.city || '',
          country: '',
          participants: 0,
          maxParticipants: 50,
          description: data.description || '',
          price: 'Free',
          language: data.language || '',
        };
        setEvent(mapped);
        setParticipants(0);
      }
      setLoadingEvent(false);
    });
  }, [id, isUuid]);

  if (loadingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="w-8 h-8 rounded-full border-2 border-[#c0913f] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Event not found.</p>
          <Link to="/events" className="text-sm font-medium" style={{ color: '#c0913f' }}>
            ← Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const gradientIndex = typeof event.id === 'number' ? (event.id - 1) % 3 : 0;
  const gradient = CARD_GRADIENTS[gradientIndex];
  const isFull = participants >= event.maxParticipants;
  const pct = Math.min((participants / event.maxParticipants) * 100, 100);

  const handleJoin = () => {
    if (joined || isFull || joining) return;
    setJoining(true);
    setTimeout(() => {
      setJoining(false);
      setJoined(true);
      setParticipants((p) => p + 1);
    }, 1200);
  };

  let joinLabel = 'Join Event';
  if (joining) joinLabel = 'Joining…';
  else if (joined) joinLabel = 'Joined ✓';
  else if (isFull) joinLabel = 'Event Full';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">

        {/* Back link */}
        <Link
          to="/events"
          className="group inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-[#c0913f] transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Events
        </Link>

        {/* Hero banner */}
        <div
          className="w-full h-64 md:h-80 rounded-3xl shadow-sm mb-10 relative overflow-hidden flex items-center justify-center animate-fade-in-up"
          style={{ background: gradient, animationDelay: '0.1s' }}
        >
          {/* Category pill */}
          <span className="absolute top-5 left-5 text-xs font-semibold px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-gray-800">
            {event.category}
          </span>
          {/* Watermark city */}
          <span
            className="text-7xl md:text-8xl font-bold select-none pointer-events-none"
            style={{
              color: 'rgba(192,145,63,0.20)',
              fontFamily: "'Playfair Display', serif",
              mixBlendMode: 'overlay',
            }}
          >
            {event.city}
          </span>
        </div>

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>

          {/* ── Left column (2/3) ── */}
          <div className="md:col-span-2 space-y-8">

            {/* Title + organizer */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h1
                className="text-4xl md:text-5xl font-medium leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
              >
                {event.title}
              </h1>
              <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#fdf3e3', color: '#c0913f', fontFamily: "'Playfair Display', serif" }}
                >
                  {getInitials(event.organizer)}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Hosted by</p>
                  <p className="font-semibold text-gray-800">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
              <h2
                className="text-xl font-medium mb-4"
                style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
              >
                About this event
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px]">{event.description}</p>
            </div>

            {/* Language focus */}
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
              <h2
                className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2"
              >
                Language Focus
              </h2>
              <div className="inline-flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3">
                <Type className="h-5 w-5" style={{ color: '#c0913f' }} />
                <span className="text-lg font-medium text-gray-800">{event.language}</span>
              </div>
            </div>
          </div>

          {/* ── Right sidebar (1/3) ── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm sticky top-24 space-y-5">

              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(192,145,63,0.1)' }}>
                  <Clock className="h-5 w-5" style={{ color: '#c0913f' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{event.date}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{event.time} local time</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(192,145,63,0.1)' }}>
                  <MapPin className="h-5 w-5" style={{ color: '#c0913f' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{event.city}, {event.country}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Exact location sent after joining</p>
                </div>
              </div>

              {/* Participants + progress */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(192,145,63,0.1)' }}>
                  <Users className="h-5 w-5" style={{ color: '#c0913f' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: '#c0913f' }}>
                    {participants} / {event.maxParticipants}
                  </p>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, backgroundColor: '#c0913f' }}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <button
                  onClick={handleJoin}
                  disabled={joining || isFull || joined}
                  className="w-full py-4 rounded-xl text-sm font-medium text-white transition-all duration-200
                             hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                  style={{
                    backgroundColor: isFull ? '#9ca3af' : '#c0913f',
                    boxShadow: '0 4px 20px rgba(192,145,63,0.25)',
                  }}
                >
                  {joinLabel}
                </button>
                {joined && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    You have joined this event!
                  </p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
