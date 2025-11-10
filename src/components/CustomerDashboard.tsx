<<<<<<< HEAD
﻿import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User as UserIcon, } from "lucide-react";
import { api, type User, type Appointment } from "../services/api";
import { AppointmentCard } from "./AppointmentCard";
import { BookingModal } from "./BookingModal";
import { toast } from "sonner";
=======
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User as UserIcon, LogOut } from 'lucide-react';
import { api, type User, type Appointment } from '../services/api';
import { AppointmentCard } from './AppointmentCard';
import { toast } from 'sonner@2.0.3';
>>>>>>> origin/main

interface CustomerDashboardProps {
  user: User;
  onLogout: () => void;
<<<<<<< HEAD
  reload?: boolean;
  onBookNew: () => void;
}

export function CustomerDashboard({ user,}: CustomerDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");
  const [showBookingModal, setShowBookingModal] = useState(false);
=======
  onBookNew: () => void;
}

export function CustomerDashboard({ user, onLogout, onBookNew }: CustomerDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
>>>>>>> origin/main

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await api.getMyAppointments();
      setAppointments(data);
    } catch (error: any) {
<<<<<<< HEAD
      toast.error("Failed to load appointments");
=======
      toast.error('Failed to load appointments');
>>>>>>> origin/main
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const filteredAppointments = appointments.filter(
    (apt) => filter === "all" || apt.status === filter
=======
  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' || apt.status === filter
>>>>>>> origin/main
  );

  const stats = {
    total: appointments.length,
<<<<<<< HEAD
    pending: appointments.filter((a) => a.status === "pending").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

 
  
=======
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length,
  };

>>>>>>> origin/main
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
<<<<<<< HEAD
                Welcome,{" "}
                <span className="text-amber-500">{user.first_name}</span>
              </h1>
              <p className="text-neutral-400">Manage your appointments</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowBookingModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black tracking-wider rounded"
=======
                Welcome, <span className="text-amber-500">{user.first_name}</span>
              </h1>
              <p className="text-neutral-400">Manage your appointments</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={onBookNew}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black tracking-wider"
>>>>>>> origin/main
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK NEW
              </motion.button>
<<<<<<< HEAD

        

=======
              <motion.button
                onClick={onLogout}
                className="px-6 py-3 border border-white/20 hover:border-amber-500 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                LOGOUT
              </motion.button>
>>>>>>> origin/main
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-neutral-900 border border-white/10 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-10 h-10 text-amber-500" />
                <div>
                  <div className="text-3xl">{stats.total}</div>
                  <div className="text-sm text-neutral-400">Total Appointments</div>
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
                <UserIcon className="w-10 h-10 text-green-500" />
                <div>
                  <div className="text-3xl">{stats.completed}</div>
                  <div className="text-sm text-neutral-400">Completed</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
<<<<<<< HEAD
          {(["all", "pending", "completed", "cancelled"] as const).map((status) => (
=======
          {(['all', 'pending', 'completed', 'cancelled'] as const).map((status) => (
>>>>>>> origin/main
            <motion.button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 uppercase tracking-wider text-sm whitespace-nowrap ${
                filter === status
<<<<<<< HEAD
                  ? "bg-amber-500 text-black"
                  : "bg-neutral-900 border border-white/10 hover:border-amber-500"
=======
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 border border-white/10 hover:border-amber-500'
>>>>>>> origin/main
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
<<<<<<< HEAD
            <p className="text-neutral-400">
              No {filter !== "all" ? filter : ""} appointments found
            </p>
=======
            <p className="text-neutral-400">No {filter !== 'all' ? filter : ''} appointments found</p>
            {filter === 'all' && (
              <motion.button
                onClick={onBookNew}
                className="mt-4 px-6 py-2 bg-amber-500 text-black tracking-wider"
                whileHover={{ scale: 1.05 }}
              >
                BOOK YOUR FIRST APPOINTMENT
              </motion.button>
            )}
>>>>>>> origin/main
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                currentUser={user}
              />
            ))}
          </div>
        )}
      </div>
<<<<<<< HEAD

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onSuccess={loadAppointments}
        />
      )}
    </div>
  );
}




=======
    </div>
  );
}
>>>>>>> origin/main
