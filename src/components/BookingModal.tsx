import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, Scissors } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { api, type Barber } from '../services/api';

interface BookingModalProps {
  onClose: () => void;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
}

export function BookingModal({ onClose, isAuthenticated, onLoginRequired }: BookingModalProps) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingBarbers, setLoadingBarbers] = useState(true);
  const [formData, setFormData] = useState({
    barber_id: '',
    date: '',
    time: '',
    notes: '',
  });

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const data = await api.getBarbers();
      setBarbers(data);
    } catch (error) {
      toast.error('Failed to load barbers');
    } finally {
      setLoadingBarbers(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      onClose();
      onLoginRequired();
      toast.info('Please login to book an appointment');
      return;
    }

    setLoading(true);

    try {
      // Combine date and time
      const appointmentDate = new Date(`${formData.date}T${formData.time}:00`);
      
      await api.createAppointment({
        barber_id: Number(formData.barber_id),
        appointment_date: appointmentDate.toISOString(),
        notes: formData.notes,
      });

      toast.success('Booking confirmed! See you soon! 💈');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

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
          className="bg-neutral-900 border-2 border-amber-500 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0, rotateX: -45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-neutral-900 border-b border-amber-500/30 px-8 py-6 flex items-center justify-between">
            <h2 className="text-3xl tracking-wider">BOOK APPOINTMENT</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-amber-500/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {!isAuthenticated && (
              <div className="bg-amber-500/10 border border-amber-500 p-4 rounded">
                <p className="text-amber-500 text-sm">
                  You need to login to book an appointment. Click "Confirm Booking" to proceed to login.
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="barber" className="flex items-center gap-2 mb-2 text-neutral-300">
                <User className="w-4 h-4" />
                Select Barber
              </Label>
              <Select
                value={formData.barber_id}
                onValueChange={(value) => setFormData({ ...formData, barber_id: value })}
                required
              >
                <SelectTrigger className="bg-black border-white/20">
                  <SelectValue placeholder={loadingBarbers ? "Loading..." : "Choose your barber"} />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((barber) => (
                    <SelectItem key={barber.id} value={String(barber.id)}>
                      <div className="flex flex-col">
                        <span>{barber.user.first_name} {barber.user.last_name}</span>
                        <span className="text-xs text-neutral-400">
                          {barber.specialization} • {barber.experience} years exp
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="flex items-center gap-2 mb-2 text-neutral-300">
                  <Calendar className="w-4 h-4" />
                  Appointment Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  min={today}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-black border-white/20 focus:border-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="time" className="flex items-center gap-2 mb-2 text-neutral-300">
                  <Clock className="w-4 h-4" />
                  Appointment Time
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) => setFormData({ ...formData, time: value })}
                  required
                >
                  <SelectTrigger className="bg-black border-white/20">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="18:00">6:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="flex items-center gap-2 mb-2 text-neutral-300">
                <Scissors className="w-4 h-4" />
                Special Requests (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any specific style requests or preferences..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-black border-white/20 focus:border-amber-500 min-h-24"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || loadingBarbers}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black tracking-widest uppercase disabled:opacity-50"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? 'PROCESSING...' : 'Confirm Booking'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
