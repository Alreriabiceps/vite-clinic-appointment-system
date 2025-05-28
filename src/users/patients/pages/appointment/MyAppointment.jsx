import React, { useState } from 'react';

const mockAppointments = [
  { id: 1, date: '2024-07-10', time: '10:00', doctor: 'Dr. Smith', type: 'Consultation', status: 'Confirmed' },
  { id: 2, date: '2024-07-20', time: '14:30', doctor: 'Dr. Jones', type: 'Follow-up', status: 'Pending' },
  { id: 3, date: '2024-06-01', time: '09:00', doctor: 'Dr. Smith', type: 'Consultation', status: 'Completed' },
  { id: 4, date: '2024-05-15', time: '11:00', doctor: 'Dr. Jones', type: 'Vaccination', status: 'Cancelled' },
];

const MyAppointment = () => {
  const [appointments, setAppointments] = useState(mockAppointments);

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = appointments.filter(a => a.date >= today && a.status !== 'Completed' && a.status !== 'Cancelled');
  const past = appointments.filter(a => a.date < today || a.status === 'Completed' || a.status === 'Cancelled');

  const handleCancel = (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
        {upcoming.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {upcoming.map(appt => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{appt.date} at {appt.time}</div>
                  <div className="text-sm text-gray-600">with {appt.doctor} ({appt.type})</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-200 text-gray-700'
                  }`}>
                    {appt.status}
                  </span>
                  {appt.status !== 'Cancelled' && (
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No upcoming appointments.</div>
        )}
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Past Appointments</h2>
        {past.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {past.map(appt => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{appt.date} at {appt.time}</div>
                  <div className="text-sm text-gray-600">with {appt.doctor} ({appt.type})</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  appt.status === 'Completed' ? 'bg-gray-200 text-gray-700' :
                  appt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No past appointments.</div>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;