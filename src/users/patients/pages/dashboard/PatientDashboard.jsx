import React from 'react';

const mockProfile = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '555-123-4567',
  dob: '1992-04-15',
  address: '123 Main St, Springfield',
};

const mockAppointments = [
  { date: '2024-07-10', time: '10:00', doctor: 'Dr. Smith', type: 'Consultation', status: 'Confirmed' },
  { date: '2024-07-20', time: '14:30', doctor: 'Dr. Jones', type: 'Follow-up', status: 'Pending' },
];

const mockVisits = [
  { date: '2024-06-01', type: 'Consultation', doctor: 'Dr. Smith' },
  { date: '2024-05-15', type: 'Vaccination', doctor: 'Dr. Jones' },
];

const PatientDashboard = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Welcome, {mockProfile.name}!</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
        <div className="text-gray-700 space-y-1">
          <div><span className="font-medium">Email:</span> {mockProfile.email}</div>
          <div><span className="font-medium">Phone:</span> {mockProfile.phone}</div>
          <div><span className="font-medium">Date of Birth:</span> {mockProfile.dob}</div>
          <div><span className="font-medium">Address:</span> {mockProfile.address}</div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
        {mockAppointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {mockAppointments.map((appt, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{appt.date} at {appt.time}</div>
                  <div className="text-sm text-gray-600">with {appt.doctor} ({appt.type})</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                  appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No upcoming appointments.</div>
        )}
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg shadow p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-2">Recent Visits</h2>
        {mockVisits.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {mockVisits.map((visit, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{visit.date}</div>
                  <div className="text-sm text-gray-600">{visit.type} with {visit.doctor}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No recent visits.</div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;