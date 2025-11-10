import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api, type Barber } from "../services/api";
import { toast } from "sonner";

interface BookAppointmentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function BookAppointmentModal({
  onClose,
  onSuccess,
}: BookAppointmentModalProps) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [barberId, setBarberId] = useState<number | null>(null);
  const [datetime, setDatetime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch barbers
  useEffect(() => {
    const loadBarbers = async () => {
      try {
        const data = await api.getBarbers();
        setBarbers(data);
      } catch {
        toast.error("Failed to load barbers");
      }
    };
    loadBarbers();
  }, []);

  // Create appointment
  const handleConfirm = async () => {
    if (!barberId || !datetime) {
      toast.error("Please select a barber and date/time");
      return;
    }

    setLoading(true);
    try {
      await api.createAppointment({
        barber_id: barberId,
        appointment_date: datetime,
        notes,
      });
      toast.success("Appointment booked successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <motion.div
        className="bg-neutral-900 p-6 rounded-lg w-full max-w-md border border-white/10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          Book Appointment
        </h2>

        {/* Barber selection */}
        <label className="block mb-2 text-sm text-neutral-400">Barber</label>
        <select
          className="w-full bg-neutral-800 p-2 mb-4 text-white rounded"
          onChange={(e) => setBarberId(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            Select Barber
          </option>
          {barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.user.first_name} {b.user.last_name} 
            </option>
          ))}
        </select>

        {/* DateTime */}
        <label className="block mb-2 text-sm text-neutral-400">
          Date & Time
        </label>
        <input
          type="datetime-local"
          className="w-full bg-neutral-800 p-2 mb-4 text-white rounded"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />

        {/* Notes */}
        <label className="block mb-2 text-sm text-neutral-400">
          Notes (optional)
        </label>
        <textarea
          className="w-full bg-neutral-800 p-2 mb-4 text-white rounded"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/20 text-white hover:border-amber-500 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}




