import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const visitTypes = [
  'Consultation',
  'Follow-up',
  'Vaccination',
  'Routine Checkup',
  'Other',
];

const patientsList = [
  'Alice Smith',
  'Bob Johnson',
  'Charlie Brown',
  'Diana Prince',
];

const doctorsList = [
  'Dr. Jones',
  'Dr. Smith',
];

const Appointment = () => {
  // Mock data for appointments
  const mockAppointments = [
    {
      id: 1,
      date: '2023-10-26',
      time: '10:00',
      patient: 'Alice Smith',
      doctor: 'Dr. Jones',
      status: 'Confirmed',
      type: 'Consultation',
      reason: 'Headache',
    },
    {
      id: 2,
      date: '2023-10-26',
      time: '11:00',
      patient: 'Bob Johnson',
      doctor: 'Dr. Smith',
      status: 'Pending',
      type: 'Follow-up',
      reason: 'Checkup after surgery',
    },
    {
      id: 3,
      date: '2023-10-27',
      time: '14:00',
      patient: 'Charlie Brown',
      doctor: 'Dr. Jones',
      status: 'Cancelled',
      type: 'Vaccination',
      reason: 'Flu shot',
    },
    {
      id: 4,
      date: '2023-10-27',
      time: '15:30',
      patient: 'Diana Prince',
      doctor: 'Dr. Smith',
      status: 'Confirmed',
      type: 'Consultation',
      reason: 'General consultation',
    },
  ];

  const [appointments, setAppointments] = useState(mockAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    patient: '',
    date: '',
    time: '',
    type: '',
    reason: '',
    doctor: '',
  });
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Get unique doctors and statuses from mock data for filter options
  const doctors = [...new Set([...mockAppointments.map(appt => appt.doctor), ...doctorsList])];
  const statuses = [...new Set(mockAppointments.map(appt => appt.status))];

  useEffect(() => {
    let filtered = appointments;
    if (selectedDate) {
      filtered = filtered.filter(appt => appt.date === selectedDate);
    }
    if (selectedDoctor) {
      filtered = filtered.filter(appt => appt.doctor === selectedDoctor);
    }
    if (selectedStatus) {
      filtered = filtered.filter(appt => appt.status === selectedStatus);
    }
    setFilteredAppointments(filtered);
  }, [appointments, selectedDate, selectedDoctor, selectedStatus]);

  const handleApprove = (id) => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: 'Confirmed' } : appt));
  };

  const handleCancel = (id) => {
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status: 'Cancelled' } : appt));
  };

  const handleReschedule = (id) => {
    alert('Reschedule logic not implemented in mockup.');
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.patient || !form.date || !form.time || !form.type || !form.reason) {
      alert('Please fill in all required fields.');
      return;
    }
    const newAppointment = {
      id: appointments.length + 1,
      date: form.date,
      time: form.time,
      patient: form.patient,
      doctor: form.doctor || '',
      status: 'Pending',
      type: form.type,
      reason: form.reason,
    };
    setAppointments(prev => [...prev, newAppointment]);
    setShowModal(false);
    setForm({ patient: '', date: '', time: '', type: '', reason: '', doctor: '' });
  };

  // Appointments for the selected calendar date
  const calendarDateStr = calendarDate.toISOString().slice(0, 10);
  const appointmentsForCalendarDate = appointments.filter(
    (appt) => appt.date === calendarDateStr
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      {/* View Toggle */}
      <div className="mb-6 flex justify-end gap-2">
        <button
          className={`px-4 py-2 rounded-l-md border border-blue-600 font-medium transition ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
          onClick={() => setView('list')}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 rounded-r-md border border-blue-600 font-medium transition ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
          onClick={() => setView('calendar')}
        >
          Calendar View
        </button>
      </div>

      {/* New Appointment Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
        >
          + New Appointment
        </button>
      </div>

      {/* Modal for New Appointment */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Appointment Details</h2>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="patient" className="block mb-1 text-sm font-medium text-gray-700">Patient Name</label>
                <select
                  id="patient"
                  required
                  value={form.patient}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Patient</option>
                  {patientsList.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block mb-1 text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  id="date"
                  type="date"
                  required
                  value={form.date}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="time" className="block mb-1 text-sm font-medium text-gray-700">Preferred Time</label>
                <input
                  id="time"
                  type="time"
                  required
                  value={form.time}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700">Type of Visit</label>
                <select
                  id="type"
                  required
                  value={form.type}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Type</option>
                  {visitTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="reason" className="block mb-1 text-sm font-medium text-gray-700">Reason for Visit / Symptoms</label>
                <textarea
                  id="reason"
                  required
                  value={form.reason}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  rows={2}
                />
              </div>
              <div>
                <label htmlFor="doctor" className="block mb-1 text-sm font-medium text-gray-700">Preferred Doctor (optional)</label>
                <select
                  id="doctor"
                  value={form.doctor}
                  onChange={handleFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">No Preference</option>
                  {doctorsList.map((doc) => (
                    <option key={doc} value={doc}>{doc}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Add Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {view === 'list' ? (
        <>
          {/* Filter controls */}
          <div className="mb-6 flex space-x-4">
            <div>
              <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="dateFilter"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label htmlFor="doctorFilter" className="block text-sm font-medium text-gray-700">Doctor</label>
              <select
                id="doctorFilter"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="statusFilter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Appointment List */}
          <div className="bg-white rounded-lg shadow p-6">
            {filteredAppointments.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredAppointments.map(appt => (
                  <li key={appt.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{appt.patient}</p>
                      <p className="text-sm text-gray-600">{appt.date} at {appt.time} with {appt.doctor || 'No Preference'}</p>
                      <p className="text-sm text-gray-600">Type: {appt.type} | Reason: {appt.reason}</p>
                      <p className={`text-sm font-medium ${
                        appt.status === 'Confirmed' ? 'text-green-600' :
                        appt.status === 'Cancelled' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>{appt.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      {appt.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleApprove(appt.id)}
                          className="px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition text-sm"
                        >
                          Approve
                        </button>
                      )}
                      {appt.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition text-sm"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleReschedule(appt.id)}
                        className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm"
                      >
                        Reschedule
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No appointments found for the selected filters.</p>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            tileContent={({ date, view }) => {
              // Show a dot if there are appointments on this date
              const dateStr = date.toISOString().slice(0, 10);
              const hasAppt = appointments.some(appt => appt.date === dateStr);
              return hasAppt && view === 'month' ? (
                <div className="flex justify-center mt-1">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
              ) : null;
            }}
          />
          <div className="mt-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-2 text-center">Appointments for {calendarDateStr}</h3>
            {appointmentsForCalendarDate.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {appointmentsForCalendarDate.map(appt => (
                  <li key={appt.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{appt.patient}</p>
                      <p className="text-sm text-gray-600">{appt.time} with {appt.doctor || 'No Preference'}</p>
                      <p className="text-sm text-gray-600">Type: {appt.type} | Reason: {appt.reason}</p>
                      <p className={`text-sm font-medium ${
                        appt.status === 'Confirmed' ? 'text-green-600' :
                        appt.status === 'Cancelled' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>{appt.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      {appt.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleApprove(appt.id)}
                          className="px-3 py-1 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition text-sm"
                        >
                          Approve
                        </button>
                      )}
                      {appt.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleCancel(appt.id)}
                          className="px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition text-sm"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleReschedule(appt.id)}
                        className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm"
                      >
                        Reschedule
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center">No appointments for this date.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;