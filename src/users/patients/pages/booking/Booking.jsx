import React, { useState } from 'react';

const visitTypes = [
  'Consultation',
  'Follow-up',
  'Vaccination',
  'Routine Checkup',
  'Other',
];

const doctorsList = [
  'Dr. Jones',
  'Dr. Smith',
];

// Mock available slots by date
const mockAvailableSlots = {
  '2024-07-10': ['09:00', '10:00', '11:00', '14:00'],
  '2024-07-11': ['10:00', '13:00', '15:30'],
  '2024-07-12': ['09:30', '11:30', '16:00'],
};

const Booking = () => {
  const [form, setForm] = useState({
    date: '',
    time: '',
    type: '',
    reason: '',
    doctor: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const availableSlots = form.date ? mockAvailableSlots[form.date] || [] : [];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
    // Reset time if date changes
    if (id === 'date') {
      setForm(prev => ({ ...prev, time: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.date || !form.time || !form.type || !form.reason) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to book appointment');
      }
      setForm({ date: '', time: '', type: '', reason: '', doctor: '' });
      setSuccess('Appointment booked successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h1>
        <form className="bg-white rounded-lg shadow p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Preferred Date</label>
            <input
              id="date"
              type="date"
              required
              value={form.date}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700">Preferred Time</label>
            <select
              id="time"
              required
              value={form.time}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              disabled={!form.date || availableSlots.length === 0}
            >
              <option value="">{!form.date ? 'Select a date first' : availableSlots.length === 0 ? 'No slots available' : 'Select Time'}</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">Type of Visit</label>
            <select
              id="type"
              required
              value={form.type}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">Select Type</option>
              {visitTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-700">Reason for Visit / Symptoms</label>
            <textarea
              id="reason"
              required
              value={form.reason}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              rows={2}
            />
          </div>
          <div>
            <label htmlFor="doctor" className="block mb-2 text-sm font-medium text-gray-700">Preferred Doctor (optional)</label>
            <select
              id="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="">No Preference</option>
              {doctorsList.map((doc) => (
                <option key={doc} value={doc}>{doc}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;