import { useState, useEffect } from "react";
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
    } finally {
      setLoading(false);
    }
  };

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




