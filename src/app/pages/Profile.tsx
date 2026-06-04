import { useState } from 'react';
import {
  User, MapPin, Globe, Tag, AlignLeft, Mail, Pencil, Lock,
  Calendar, Plus, X, CheckCircle, LogOut, Camera,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useProfile, UserProfile, UserLanguage } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router';


const LANGUAGES_OPTIONS = ['English', 'German', 'French', 'Spanish', 'Italian', 'Portuguese', 'Turkish', 'Dutch', 'Polish', 'Other'];
const LEVELS: UserLanguage['level'][] = ['Native', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1'];
const INTEREST_OPTIONS = ['Languages', 'Travel', 'Networking', 'Business', 'Technology', 'Culture', 'Literature', 'Music', 'Coffee', 'Food', 'Sports', 'Art', 'Film', 'Startups', 'Education'];
const CITIES = ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Vienna', 'Zurich', 'Amsterdam', 'Paris', 'Barcelona', 'Madrid', 'Rome', 'Prague', 'Warsaw', 'Other'];

const LEVEL_COLORS: Record<string, string> = {
  Native: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  C2: 'bg-blue-50 text-blue-700 border-blue-200',
  C1: 'bg-blue-50 text-blue-600 border-blue-200',
  B2: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  B1: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  A2: 'bg-orange-50 text-orange-600 border-orange-200',
  A1: 'bg-orange-50 text-orange-500 border-orange-200',
};


function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

// ─── Profile Form ────────────────────────────────────────────────────────────
function ProfileForm({ onSave, initial, requirePassword }: { onSave: (p: UserProfile, password?: string) => Promise<void>; initial?: UserProfile; requirePassword?: boolean }) {
  const [fullName, setFullName] = useState(initial?.fullName || '');
  const [email, setEmail] = useState(initial?.email || '');
  const [city, setCity] = useState(initial?.city || '');
  const [bio, setBio] = useState(initial?.bio || '');
  const [languages, setLanguages] = useState<UserLanguage[]>(initial?.languages || [{ name: '', level: 'B1' }]);
  const [interests, setInterests] = useState<string[]>(initial?.interests || []);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const addLanguage = () => setLanguages((prev) => [...prev, { name: '', level: 'B1' }]);
  const removeLanguage = (i: number) => setLanguages((prev) => prev.filter((_, idx) => idx !== i));
  const updateLanguage = (i: number, field: keyof UserLanguage, value: string) =>
    setLanguages((prev) => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  const toggleInterest = (interest: string) =>
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    const profileData: UserProfile = {
      fullName,
      email,
      city,
      bio,
      languages: languages.filter((l) => l.name),
      interests,
      memberSince: initial?.memberSince || '',
      upcomingEventIds: initial?.upcomingEventIds || [],
      joinedEventIds: initial?.joinedEventIds || [],
    };
    await onSave(profileData, requirePassword ? password : undefined);
    setSaving(false);
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-sm p-12 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#fdf3e3' }}>
            <CheckCircle className="h-8 w-8" style={{ color: '#c0913f' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}>
            Profile saved!
          </h2>
          <p className="text-gray-500 text-sm">Welcome to Spontane, {fullName.split(' ')[0]}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: '#fdf3e3', color: '#c0913f' }}>
            Your Account
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}>
            {initial ? 'Edit Profile' : 'Create Your Profile'}
          </h1>
          <p className="text-gray-500">
            {initial ? 'Update your information below.' : 'Join the Spontane community and start connecting.'}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-8 md:p-10 space-y-7">

          {/* Avatar placeholder */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
                style={{ background: 'linear-gradient(135deg, #c0913f, #e8b86d)' }}>
                {fullName ? getInitials(fullName) : <Camera className="h-8 w-8 opacity-70" />}
              </div>
              <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center border border-gray-200 hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2"><User className="h-4 w-4" style={{ color: '#c0913f' }} />Full Name</span>
            </label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required
              placeholder="e.g. Sarah Müller"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600/30" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: '#c0913f' }} />Email</span>
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600/30" />
          </div>

          {/* Password — only shown when creating a new profile */}
          {requirePassword && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center gap-2"><Lock className="h-4 w-4" style={{ color: '#c0913f' }} />Password</span>
              </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600/30" />
              {saveError && <p className="text-xs text-red-500 mt-1">{saveError}</p>}
            </div>
          )}

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" style={{ color: '#c0913f' }} />City</span>
            </label>
            <div className="relative">
              <select value={city} onChange={(e) => setCity(e.target.value)} required
                className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-600/30 cursor-pointer">
                <option value="" disabled>Select your city</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
            </div>
          </div>

          {/* Spoken Languages */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="flex items-center gap-2"><Globe className="h-4 w-4" style={{ color: '#c0913f' }} />Spoken Languages</span>
            </label>
            <div className="space-y-3">
              {languages.map((lang, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <select value={lang.name} onChange={(e) => updateLanguage(i, 'name', e.target.value)}
                      className="w-full appearance-none px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none cursor-pointer">
                      <option value="" disabled>Select language</option>
                      {LANGUAGES_OPTIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
                  </div>
                  <div className="relative w-28">
                    <select value={lang.level} onChange={(e) => updateLanguage(i, 'level', e.target.value as UserLanguage['level'])}
                      className="w-full appearance-none px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none cursor-pointer">
                      {LEVELS.map((lv) => <option key={lv}>{lv}</option>)}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
                  </div>
                  <button type="button" onClick={() => removeLanguage(i)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addLanguage}
                className="flex items-center gap-1.5 text-sm font-medium mt-1 hover:opacity-70 transition" style={{ color: '#c0913f' }}>
                <Plus className="h-4 w-4" /> Add Language
              </button>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <span className="flex items-center gap-2"><Tag className="h-4 w-4" style={{ color: '#c0913f' }} />Interests</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map((interest) => (
                <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    interests.includes(interest)
                      ? 'text-white border-transparent shadow-sm'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                  style={interests.includes(interest) ? { backgroundColor: '#c0913f', borderColor: '#c0913f' } : {}}>
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center gap-2"><AlignLeft className="h-4 w-4" style={{ color: '#c0913f' }} />Short Bio</span>
            </label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
              placeholder="Tell the community a bit about yourself..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600/30 resize-none" />
          </div>

          <div className="border-t border-gray-100 pt-2" />

          <Button type="submit"
            className="w-full text-white font-semibold py-4 rounded-xl text-base hover:opacity-90 transition-opacity shadow-md"
            style={{ backgroundColor: '#c0913f' }}>
            {saving ? 'Saving…' : 'Save Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Profile Dashboard ────────────────────────────────────────────────────────
function ProfileDashboard({ profile, onEdit }: { profile: UserProfile; onEdit: () => void }) {
  const { logout } = useProfile();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#c0913f' }}>My Profile</span>
          <div className="flex items-center gap-3">
            <button onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
              <Pencil className="h-4 w-4" /> Edit Profile
            </button>
            <button onClick={() => { logout(); navigate('/'); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition">
              <LogOut className="h-4 w-4" /> Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
              style={{ background: 'linear-gradient(135deg, #c0913f, #e8b86d)' }}>
              {getInitials(profile.fullName)}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {profile.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              {profile.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" style={{ color: '#c0913f' }} /> {profile.city}
                </span>
              )}
              {profile.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" style={{ color: '#c0913f' }} /> {profile.email}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" style={{ color: '#c0913f' }} /> Member since {profile.memberSince}
              </span>
            </div>
            {profile.bio && (
              <p className="text-gray-600 text-sm leading-relaxed max-w-xl">{profile.bio}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Languages */}
          <div className="bg-white rounded-3xl shadow-sm p-7">
            <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <Globe className="h-5 w-5" style={{ color: '#c0913f' }} /> Spoken Languages
            </h2>
            {profile.languages.length === 0 ? (
              <p className="text-sm text-gray-400">No languages added yet.</p>
            ) : (
              <div className="space-y-3">
                {profile.languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800">{lang.name}</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${LEVEL_COLORS[lang.level] || 'bg-gray-100 text-gray-600'}`}>
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="bg-white rounded-3xl shadow-sm p-7">
            <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <Tag className="h-5 w-5" style={{ color: '#c0913f' }} /> Interests
            </h2>
            {profile.interests.length === 0 ? (
              <p className="text-sm text-gray-400">No interests added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span key={interest}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 bg-gray-50">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-3xl shadow-sm p-7">
          <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Calendar className="h-5 w-5" style={{ color: '#c0913f' }} /> Upcoming Events
          </h2>
          <p className="text-sm text-gray-400 mb-4">You haven't joined any upcoming events yet.</p>
          <button onClick={() => navigate('/events')}
            className="text-sm font-medium hover:opacity-70 transition" style={{ color: '#c0913f' }}>
            Browse all events →
          </button>
        </div>

        {/* Event History */}
        <div className="bg-white rounded-3xl shadow-sm p-7">
          <h2 className="text-base font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" style={{ color: '#c0913f' }} /> Event History
          </h2>
          <p className="text-sm text-gray-400">No past events attended yet.</p>
        </div>

      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function Profile() {
  const { profile, isLoggedIn, saveProfile, updateProfile, register } = useProfile();
  const [editing, setEditing] = useState(false);

  if (!isLoggedIn || editing) {
    return (
      <ProfileForm
        initial={editing ? profile! : undefined}
        requirePassword={!isLoggedIn}
        onSave={async (data, password) => {
          if (editing) {
            await updateProfile(data);
            setEditing(false);
          } else {
            // New user — register with Supabase Auth
            await register(data.fullName, data.email, password || '', data.city);
            await saveProfile(data);
          }
        }}
      />
    );
  }

  return <ProfileDashboard profile={profile!} onEdit={() => setEditing(true)} />;
}
