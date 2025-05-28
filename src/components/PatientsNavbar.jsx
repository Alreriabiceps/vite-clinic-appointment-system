import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/patient/dashboard', label: 'Dashboard' },
  { to: '/patient/booking', label: 'Book Appointment' },
  { to: '/patient/appointments', label: 'My Appointments' },
];

const PatientsNavbar = () => {
  return (
    <nav className="bg-white shadow mb-8">
      <div className="max-w-4xl mx-auto px-4">
        <ul className="flex space-x-6 py-4 justify-center">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-700 hover:bg-blue-100'
                  }`
                }
                end
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default PatientsNavbar;