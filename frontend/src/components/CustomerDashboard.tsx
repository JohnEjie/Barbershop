import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User as UserIcon, LogOut, Home } from "lucide-react";
import { api, type User, type Appointment } from "../services/api";
import { AppointmentCard } from "./AppointmentCard";
import { BookingModal } from "./BookingModal";
import { toast } from "sonner";

interface CustomerDashboardProps {
  user: User;
  onLogout: () => void;
  reload?: boolean;
}

export function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await api.getMyAppointments();
      setAppointments(data);
    } catch (error: any) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) => filter === "all" || apt.status === filter
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header title and buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 flex-wrap">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-2 text-center sm:text-left">
                Welcome, <span className="text-amber-500">{user.first_name}</span>
              </h1>
              <p className="text-neutral-400 text-center sm:text-left">
                Manage your appointments
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-3">
              <motion.button
                onClick={() => setShowBookingModal(true)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black tracking-wider rounded text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BOOK NEW
              </motion.button>

              <motion.button
                onClick={handleGoHome}
                className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 hover:border-blue-500 flex items-center gap-2 rounded text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5 text-blue-400" />
                HOME
              </motion.button>

              <motion.button
                onClick={onLogout}
                className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 hover:border-red-500 flex items-center gap-2 rounded text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5 text-red-400" />
                LOGOUT
              </motion.button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              className="bg-neutral-900 border border-white/10 p-5 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-8 sm:w-10 h-8 sm:h-10 text-amber-500" />
                <div>
                  <div className="text-2xl sm:text-3xl">{stats.total}</div>
                  <div className="text-xs sm:text-sm text-neutral-400">
                    Total Appointments
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-neutral-900 border border-white/10 p-5 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <Clock className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-500" />
                <div>
                  <div className="text-2xl sm:text-3xl">{stats.pending}</div>
                  <div className="text-xs sm:text-sm text-neutral-400">
                    Pending
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-neutral-900 border border-white/10 p-5 sm:p-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-4">
                <UserIcon className="w-8 sm:w-10 h-8 sm:h-10 text-green-500" />
                <div>
                  <div className="text-2xl sm:text-3xl">{stats.completed}</div>
                  <div className="text-xs sm:text-sm text-neutral-400">
                    Completed
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "pending", "completed", "cancelled"] as const).map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 sm:px-6 py-2 uppercase tracking-wider text-xs sm:text-sm whitespace-nowrap rounded ${
                filter === status
                  ? "bg-amber-500 text-black"
                  : "bg-neutral-900 border border-white/10 hover:border-amber-500"
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
            <div className="inline-block w-10 h-10 sm:w-12 sm:h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-neutral-900 border border-white/10 rounded-lg">
            <Calendar className="w-12 sm:w-16 h-12 sm:h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400 text-sm sm:text-base">
              No {filter !== "all" ? filter : ""} appointments found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
