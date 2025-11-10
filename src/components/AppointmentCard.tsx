import { motion } from 'motion/react';
import { Calendar, Clock, User, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { type Appointment, type User as UserType } from '../services/api';
import { formatDate } from '../utils/date';

interface AppointmentCardProps {
  appointment: Appointment;
  currentUser: UserType;
  onStatusChange?: (id: number, status: 'completed' | 'cancelled') => void;
}

export function AppointmentCard({ appointment, currentUser, onStatusChange }: AppointmentCardProps) {
  const isBarber = currentUser.role === 'barber';
  const isPending = appointment.status === 'pending';
  
  const statusConfig = {
    pending: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: AlertCircle, label: 'PENDING' },
    completed: { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, label: 'COMPLETED' },
    cancelled: { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle, label: 'CANCELLED' },
  };

  const config = statusConfig[appointment.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 border border-white/10 hover:border-amber-500/50 p-6 transition-colors"
      whileHover={{ scale: 1.02 }}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${config.bg} ${config.color} px-3 py-1 text-sm`}>
          <StatusIcon className="w-4 h-4" />
          <span className="tracking-wider">{config.label}</span>
        </div>
        <span className="text-xs text-neutral-500">
          {formatDate(appointment.created_at, 'short')}
        </span>
      </div>

      {/* Appointment Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-sm text-neutral-400">Appointment Date</div>
            <div className="text-white">
              {formatDate(appointment.appointment_date, 'full')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-sm text-neutral-400">Time</div>
            <div className="text-white">
              {formatDate(appointment.appointment_date, 'time')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-sm text-neutral-400">
              {isBarber ? 'Customer' : 'Barber'}
            </div>
            <div className="text-white">
              {isBarber 
                ? `${appointment.customer.first_name} ${appointment.customer.last_name}`
                : `${appointment.barber.user.first_name} ${appointment.barber.user.last_name}`
              }
            </div>
          </div>
        </div>

        {!isBarber && appointment.barber.specialization && (
          <div className="text-sm text-neutral-400">
            Specialization: <span className="text-amber-500">{appointment.barber.specialization}</span>
          </div>
        )}

        {appointment.notes && (
          <div className="flex items-start gap-3 pt-2 border-t border-white/10">
            <FileText className="w-5 h-5 text-amber-500 mt-1" />
            <div>
              <div className="text-sm text-neutral-400 mb-1">Notes</div>
              <div className="text-white text-sm">{appointment.notes}</div>
            </div>
          </div>
        )}
      </div>

      {/* Actions for Barbers */}
      {isBarber && isPending && onStatusChange && (
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <motion.button
            onClick={() => onStatusChange(appointment.id, 'completed')}
            className="flex-1 py-2 bg-green-500/20 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors tracking-wider text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            COMPLETE
          </motion.button>
          <motion.button
            onClick={() => onStatusChange(appointment.id, 'cancelled')}
            className="flex-1 py-2 bg-red-500/20 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors tracking-wider text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CANCEL
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
