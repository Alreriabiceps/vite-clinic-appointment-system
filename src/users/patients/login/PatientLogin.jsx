import React from 'react';
import { Link } from 'react-router-dom';

const PatientLogin = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Patient Login</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" placeholder="patient@example.com" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" required className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
          </div>
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Login</button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Don't have an account?</span>
          <Link
            to="/patient/registration"
            className="ml-2 inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-sm"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;