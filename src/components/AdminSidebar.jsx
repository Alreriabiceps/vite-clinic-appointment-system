import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Function to check if a link is active
  const isActive = (path) => {
    return currentPath === path || (currentPath.startsWith(path) && path !== '/admin');
  };

  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">
      {/* Sidebar Header */}
      <div className="px-3 py-6 border-b border-gray-200 text-center">
        <span className="text-xl font-bold text-blue-700 tracking-wide">Admin Panel</span>
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto flex-1">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/dashboard")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/dashboard") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/dashboard") ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0v6m0 0H7m6 0h6"
                />
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/patients"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/patients")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/patients") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/patients") ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.607 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-3">Patients List</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/patients/add"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/patients/add")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/patients/add") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/patients/add") ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="ml-3">Add Patient</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/patients/historyinfo"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/patients/historyinfo")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/patients/historyinfo") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/patients/historyinfo")
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 17l4 4 4-4m0-5a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-3">Patient History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/appointments"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/appointments")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/appointments") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/appointments") ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-3">Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 ${
                isActive("/admin/settings")
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-900"
              }`}
              aria-current={isActive("/admin/settings") ? "page" : undefined}
            >
              <svg
                className={`w-5 h-5 ${
                  isActive("/admin/settings") ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4"
                />
              </svg>
              <span className="ml-3">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
