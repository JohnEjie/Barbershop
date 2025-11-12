
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { api, type User as UserType } from '../services/api';
interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserType) => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await api.login({
        username: formData.username,
        password: formData.password,
      });
      

      toast.success('Welcome back! ðŸŽ‰');

      toast.success('Welcome back! 🎉');
      onSuccess(user);
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.password2) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { user } = await api.signup(formData);
      

      toast.success('Account created successfully!');

      toast.success('Account created successfully!');

      onSuccess(user);
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-neutral-900 border-2 border-amber-500 max-w-md w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0, rotateX: -45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-amber-500/30 px-8 py-6 flex items-center justify-between">
            <h2 className="text-3xl tracking-wider">
              {mode === 'login' ? 'LOGIN' : 'SIGN UP'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-500/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="p-8 space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name" className="mb-2 text-neutral-300">
                    First Name
                  </Label>
                  <Input
                    id="first_name"
                    required
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    className="bg-black border-white/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name" className="mb-2 text-neutral-300">
                    Last Name
                  </Label>
                  <Input
                    id="last_name"
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    className="bg-black border-white/20 focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="username" className="flex items-center gap-2 mb-2 text-neutral-300">
                <User className="w-4 h-4" />
                Username
              </Label>
              <Input
                id="username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-black border-white/20 focus:border-amber-500"
              />
            </div>

            {mode === 'signup' && (
              <>
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-neutral-300">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black border-white/20 focus:border-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-neutral-300">
                    <Phone className="w-4 h-4" />

                    Phone Number 

                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="bg-black border-white/20 focus:border-amber-500"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2 text-neutral-300">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black border-white/20 focus:border-amber-500"
              />
            </div>

            {mode === 'signup' && (
              <div>
                <Label htmlFor="password2" className="mb-2 text-neutral-300">
                  Confirm Password
                </Label>
                <Input
                  id="password2"
                  type="password"
                  required
                  value={formData.password2}
                  onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                  className="bg-black border-white/20 focus:border-amber-500"
                />
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black tracking-widest uppercase disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'PROCESSING...' : mode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
            </motion.button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-amber-500 hover:text-amber-400 text-sm"
              >
                {mode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
