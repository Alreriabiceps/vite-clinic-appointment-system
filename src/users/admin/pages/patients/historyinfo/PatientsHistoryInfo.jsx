import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PatientsHistoryInfo = () => {
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('id');

  // Mock data for patient history (replace with API call later)
  const mockPatientHistory = {
    1: { // Patient ID 1
      personal: {
        name: 'Alice Smith',
        dob: '1990-01-01',
        email: 'alice.smith@example.com',
        phone: '123-456-7890',
      },
      medical: [
        'Diabetes (Diagnosed: 2015)',
        'Hypertension (Diagnosed: 2018)',
        'Allergy: Penicillin',
      ],
      visits: [
        '2025-05-10: General Checkup',
        '2025-03-22: Blood Test',
        '2024-12-15: Flu Vaccination',
      ],
    },
    2: { // Patient ID 2
        personal: {
          name: 'Bob Johnson',
          dob: '1985-05-15',
          email: 'bob.johnson@example.com',
          phone: '098-765-4321',
        },
        medical: [
          'Asthma',
        ],
        visits: [
          '2025-06-01: Asthma review',
        ],
      },
      3: { // Patient ID 3
        personal: {
          name: 'Charlie Brown',
          dob: '2000-11-20',
          email: 'charlie.b@example.com',
          phone: '555-123-4567',
        },
        medical: [],
        visits: [
          '2025-07-01: Initial consultation',
        ],
      },
    // Add more mock data for other patient IDs if needed
  };

  const [patientHistory, setPatientHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data based on patientId
    setLoading(true);
    const history = mockPatientHistory[patientId];
    setPatientHistory(history);
    setLoading(false);

    // In a real application, you would make an API call here:
    // fetch(`/api/patients/${patientId}/history`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setPatientHistory(data);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching patient history:', error);
    //     setLoading(false);
    //     // Handle error display
    //   });
  }, [patientId]); // Refetch when patientId changes

  if (loading) {
    return <div className="p-8">Loading patient history...</div>;
  }

  if (!patientHistory) {
    return <div className="p-8">Patient history not found for ID: {patientId}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Patient History Information</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-2xl">
        <div>
          <h2 className="text-xl font-semibold mb-3">Personal Details</h2>
          <div className="text-gray-700 text-base space-y-1">
            <p><span className="font-medium">Name:</span> {patientHistory.personal.name}</p>
            <p><span className="font-medium">DOB:</span> {patientHistory.personal.dob}</p>
            <p><span className="font-medium">Email:</span> {patientHistory.personal.email}</p>
            <p><span className="font-medium">Phone:</span> {patientHistory.personal.phone}</p>
          </div>
        </div>

        {patientHistory.medical && patientHistory.medical.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Medical History</h2>
            <ul className="text-gray-700 text-base list-disc list-inside space-y-1">
              {patientHistory.medical.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {patientHistory.visits && patientHistory.visits.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Recent Visits</h2>
            <ul className="text-gray-700 text-base list-disc list-inside space-y-1">
              {patientHistory.visits.map((visit, index) => (
                <li key={index}>{visit}</li>
              ))}
            </ul>
          </div>
        )}

        {!patientHistory.medical.length && !patientHistory.visits.length && (
            <p className="text-gray-600">No medical history or recent visits recorded.</p>
          )}

      </div>
    </div>
  );
};

export default PatientsHistoryInfo;