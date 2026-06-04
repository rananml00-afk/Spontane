import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useProfile } from '../contexts/ProfileContext';

const CITIES = [
  'Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Vienna',
  'Zurich', 'Amsterdam', 'Paris', 'Barcelona', 'Madrid',
  'Rome', 'Prague', 'Warsaw', 'Other',
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
}

export function RegisterDialog({ open, onOpenChange, onSwitchToLogin }: Props) {
  const { register } = useProfile();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register(fullName, email, password, city);
      setLoading(false);
      setFullName(''); setEmail(''); setPassword(''); setCity('');
      onOpenChange(false);
    }, 700);
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#c0913f] transition-all';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-8 border-0 shadow-xl">
        <DialogHeader className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: '#c0913f' }}>
            Join Spontane
          </p>
          <DialogTitle
            className="text-3xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Create Account
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Start connecting with language learners near you</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Full name"
              className={`${inputBase} pl-11`}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className={`${inputBase} pl-11`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Password (min. 6 characters)"
              className={`${inputBase} pl-11 pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* City */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className={`${inputBase} pl-11 appearance-none cursor-pointer`}
            >
              <option value="" disabled>Select your city</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
            style={{ backgroundColor: '#c0913f' }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>

        {/* Switch to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => { onOpenChange(false); onSwitchToLogin(); }}
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#c0913f' }}
          >
            Log In
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
