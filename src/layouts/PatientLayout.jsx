import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientsNavbar from '../components/PatientsNavbar';

const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PatientsNavbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;