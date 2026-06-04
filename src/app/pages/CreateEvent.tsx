import { useState } from 'react';
import { Calendar, MapPin, Globe, Tag, AlignLeft, Type, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const CATEGORIES = [
  'Language Exchange',
  'Culture',
  'Professional',
  'Networking',
  'Sports',
  'Travel',
];

const LANGUAGES = [
  'English',
  'German',
  'French',
  'Spanish',
  'Italian',
  'Portuguese',
  'Turkish',
  'Dutch',
  'Polish',
  'Other',
];

const CITIES = [
  'Berlin',
  'Munich',
  'Frankfurt',
  'Hamburg',
  'Cologne',
  'Vienna',
  'Zurich',
  'Amsterdam',
  'Paris',
  'Barcelona',
  'Madrid',
  'Rome',
  'Milan',
  'Prague',
  'Warsaw',
  'Other',
];

interface FormState {
  title: string;
  description: string;
  date: string;
  time: string;
  city: string;
  location: string;
  language: string;
  category: string;
}

export function CreateEvent() {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    date: '',
    time: '',
    city: '',
    location: '',
    language: '',
    category: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="bg-white rounded-3xl shadow-sm p-12 max-w-md w-full text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#fdf3e3' }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: '#c0913f' }} />
          </div>
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Event Published!
          </h2>
          <p className="text-gray-500 mb-8">
            Your event <strong className="text-gray-700">"{form.title}"</strong> has been successfully published to the Spontane community.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setForm({
                title: '',
                description: '',
                date: '',
                time: '',
                city: '',
                location: '',
                language: '',
                category: '',
              });
            }}
            className="w-full text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#c0913f' }}
          >
            Create Another Event
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-xs uppercase tracking-widest font-semibold mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: '#fdf3e3', color: '#c0913f' }}
          >
            Host an Experience
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Create an Event
          </h1>
          <p className="text-gray-500 text-lg">
            Share your passion and bring the Spontane community together.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-8 md:p-10 space-y-7">

          {/* Event Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Type className="h-4 w-4" style={{ color: '#c0913f' }} />
                Event Title
              </span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Sprachcafé Berlin – German & English Exchange"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4" style={{ color: '#c0913f' }} />
                Description
              </span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell attendees what to expect — atmosphere, activities, who it's for..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" style={{ color: '#c0913f' }} />
                  Date
                </span>
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" style={{ color: '#c0913f' }} />
                  Time
                </span>
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition cursor-pointer"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: '#c0913f' }} />
                City
              </span>
            </label>
            <div className="relative">
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition cursor-pointer"
              >
                <option value="" disabled>Select a city</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
            </div>
          </div>

          {/* Location / Venue */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: '#c0913f' }} />
                Location / Venue
              </span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="e.g. Café Central, Hauptstraße 12"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition"
            />
          </div>

          {/* Primary Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: '#c0913f' }} />
                Primary Language
              </span>
            </label>
            <div className="relative">
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                required
                className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition cursor-pointer"
              >
                <option value="" disabled>Select a language</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4" style={{ color: '#c0913f' }} />
                Category
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, category: cat }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    form.category === cat
                      ? 'text-white border-transparent shadow'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    form.category === cat
                      ? { backgroundColor: '#c0913f', borderColor: '#c0913f' }
                      : {}
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Hidden required input for category */}
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={() => {}}
              required
              className="sr-only"
              tabIndex={-1}
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 pt-2" />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full text-white font-semibold py-4 rounded-xl text-base hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: '#c0913f' }}
          >
            Publish Event
          </Button>

          <p className="text-center text-xs text-gray-400">
            By publishing, you agree to Spontane's community guidelines and terms of service.
          </p>
        </form>
      </div>
    </div>
  );
}
