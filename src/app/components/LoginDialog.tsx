import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useProfile } from '../contexts/ProfileContext';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProfile: () => void;
}

export function LoginDialog({ open, onOpenChange, onCreateProfile }: Props) {
  const { login } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (!err) {
      setEmail('');
      setPassword('');
      onOpenChange(false);
    } else {
      setError('Incorrect email or password. Please try again.');
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#c0913f] transition-all';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-8 border-0 shadow-xl">
        <DialogHeader className="mb-6 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: '#c0913f' }}>
            Welcome back
          </p>
          <DialogTitle
            className="text-3xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Log In
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">Sign in to your Spontane account</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Password"
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

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
            style={{ backgroundColor: '#c0913f' }}
          >
            {loading ? 'Logging in…' : 'Log In'}
          </Button>
        </form>

        {/* Switch to Create Profile */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => { onOpenChange(false); onCreateProfile(); }}
            className="font-semibold hover:opacity-70 transition-opacity"
            style={{ color: '#c0913f' }}
          >
            Create Profile
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
