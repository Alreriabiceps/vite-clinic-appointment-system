import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./users/admin/login/AdminLogin";
import PatientLayout from "./layouts/PatientLayout";
import PatientLogin from "./users/patients/login/PatientLogin";
// Admin pages
import Patients from "./users/admin/pages/patients/Patients";
import AddPatients from "./users/admin/pages/patients/AddPatients";
import PatientsHistoryInfo from "./users/admin/pages/patients/historyinfo/PatientsHistoryInfo";
import Appointment from "./users/admin/pages/appointments/Appointment";
import AdminDashboard from "./users/admin/pages/dashboard/AdminDashboard";
// Patient pages
import PatientDashboard from "./users/patients/pages/dashboard/PatientDashboard";
import Booking from "./users/patients/pages/booking/Booking";
import MyAppointment from "./users/patients/pages/appointment/MyAppointment";
import Registration from "./users/patients/pages/registration/Registration";
function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Route (no layout) */}
        <Route path="/admin" element={<AdminLogin />} />
        {/* Admin Layout Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<Appointment />} />
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/patients/add" element={<AddPatients />} />
          <Route path="/admin/patients/historyinfo" element={<PatientsHistoryInfo />} />
          {/* Add more admin routes here, e.g. users, etc. */}
        </Route>

        {/* Patient Login Route (no layout) */}
        <Route path="/patient" element={<PatientLogin />} />
        <Route path="/patient/registration" element={<Registration />} />
        {/* Patient Layout Routes */}
        <Route element={<PatientLayout />}>
          <Route path="patient/dashboard" element={<PatientDashboard />} />
          <Route path="patient/booking" element={<Booking />} />
          <Route path="patient/appointments" element={<MyAppointment />} />
          {/* Add more patient routes here, e.g. profile, history, etc. */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
