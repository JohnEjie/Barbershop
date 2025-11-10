<<<<<<< HEAD
﻿import { useState, useEffect } from "react";
import {
  api,
  type Barber,
  type Appointment,
  type CreateAppointmentData,
} from "../services/api";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  onSuccess: (appt: Appointment) => void;
}

export function BookingModal({ onClose, onSuccess }: Props) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barberId, setBarberId] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // âœ… Fetch barbers on mount
  useEffect(() => {
    api
      .getBarbers()
      .then((data) => {
        if (Array.isArray(data)) setBarbers(data);
        else toast.error("Invalid barber data");
      })
      .catch(() => toast.error("Failed to load barbers"));
  }, []);

  // âœ… Handle appointment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!barberId || !date) {
      toast.error("Please select a barber and date");
      return;
    }

    try {
      setLoading(true);
      const payload: CreateAppointmentData = {
        barber_id: Number(barberId),
        appointment_date: new Date(date).toISOString(),
        notes,
      };

      const created = await api.createAppointment(payload);
      toast.success("Appointment created successfully!");
      onSuccess(created);
      onClose();
    } catch (err) {
      toast.error("Failed to create appointment");
      console.error(err);
=======
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
>>>>>>> origin/main
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  // âœ… Handle manual redirect
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 text-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Barber Selection */}
        {/* Barber Selection */}
<div>
  <label className="block text-sm mb-1">Barber</label>
  <select
    value={barberId}
    onChange={(e) =>
      setBarberId(e.target.value === "" ? "" : Number(e.target.value))
    }
    className="w-full p-2 rounded bg-zinc-800"
  >
    <option value="">Select Barber</option>
    {Array.isArray(barbers) &&
      barbers.map((b) => (
        <option key={b.id} value={b.id}>
          {b.user?.first_name && b.user?.last_name
            ? `${b.user.first_name} ${b.user.last_name}`
            : b.user?.username || "Unnamed Barber"}
        </option>
      ))}
  </select>
</div>


          {/* Date & Time */}
          <div>
            <label className="block text-sm mb-1">Date & Time</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-2 rounded bg-zinc-800"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleGoHome}
              className="px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-400"
            >
              Go to Home Page
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-zinc-700 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-amber-500 text-black font-semibold rounded disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}




=======
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
>>>>>>> origin/main
