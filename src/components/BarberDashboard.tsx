import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, LogOut, TrendingUp } from 'lucide-react';
import { api, type User, type Appointment } from '../services/api';
import { AppointmentCard } from './AppointmentCard';
import { toast } from 'sonner@2.0.3';

interface BarberDashboardProps {
  user: User;
  onLogout: () => void;
}

export function BarberDashboard({ user, onLogout }: BarberDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await api.getMyAppointments();
      setAppointments(data);
    } catch (error: any) {
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: 'completed' | 'cancelled') => {
    try {
      await api.updateAppointmentStatus(id, status);
      toast.success(`Appointment ${status}!`);
      loadAppointments(); // Reload appointments
    } catch (error: any) {
      toast.error('Failed to update appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    today: appointments.filter(a => {
      const today = new Date();
      const aptDate = new Date(a.appointment_date);
      return aptDate.toDateString() === today.toDateString() && a.status === 'pending';
    }).length,
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl mb-2">
                Barber Dashboard
              </h1>
              <p className="text-neutral-400">
                Welcome back, <span className="text-amber-500">{user.first_name}</span>
              </p>
            </div>
            <motion.button
              onClick={onLogout}
              className="px-6 py-3 border border-white/20 hover:border-amber-500 flex items-center gap-2 self-start md:self-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
              LOGOUT
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              className="bg-neutral-900 border border-white/10 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-10 h-10 text-amber-500" />
                <div>
                  <div className="text-3xl">{stats.total}</div>
                  <div className="text-sm text-neutral-400">Total Bookings</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-neutral-900 border border-white/10 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Clock className="w-10 h-10 text-yellow-500" />
                <div>
                  <div className="text-3xl">{stats.pending}</div>
                  <div className="text-sm text-neutral-400">Pending</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-neutral-900 border border-white/10 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <TrendingUp className="w-10 h-10 text-green-500" />
                <div>
                  <div className="text-3xl">{stats.completed}</div>
                  <div className="text-sm text-neutral-400">Completed</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-neutral-900 border border-amber-500 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Users className="w-10 h-10 text-amber-500" />
                <div>
                  <div className="text-3xl">{stats.today}</div>
                  <div className="text-sm text-neutral-400">Today's Appointments</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['all', 'pending', 'completed', 'cancelled'] as const).map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 uppercase tracking-wider text-sm whitespace-nowrap ${
                filter === status
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 border border-white/10 hover:border-amber-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status}
            </motion.button>
          ))}
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900 border border-white/10">
            <Calendar className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">
              No {filter !== 'all' ? filter : ''} appointments
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                currentUser={user}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
