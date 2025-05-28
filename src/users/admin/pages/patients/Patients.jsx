import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const initialEditState = {
  id: '',
  name: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(initialEditState);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState(initialEditState);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/patients`);
      if (!res.ok) throw new Error('Failed to fetch patients');
      const data = await res.json();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/patients/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete patient');
      setPatients(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const openEditModal = (patient) => {
    setEditData({
      id: patient._id,
      name: patient.name,
      dob: patient.dob,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
    });
    setEditError('');
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData(initialEditState);
    setEditError('');
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditData(prev => ({ ...prev, [id]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/patients/${editData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editData.name,
          dob: editData.dob,
          gender: editData.gender,
          phone: editData.phone,
          email: editData.email,
          address: editData.address,
        }),
      });
      if (!res.ok) throw new Error('Failed to update patient');
      const updated = await res.json();
      setPatients(prev => prev.map(p => p._id === updated._id ? updated : p));
      closeEditModal();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // Details modal logic
  const openDetailsModal = (patient) => {
    setDetailsData({
      id: patient._id,
      name: patient.name,
      dob: patient.dob,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
    });
    setDetailsModalOpen(true);
  };
  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
    setDetailsData(initialEditState);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Patients List</h1>

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm p-2 w-1/3"
        />
        <Link
          to="/admin/patients/add"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
        >
          Add New Patient
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : filteredPatients.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredPatients.map(patient => (
              <li key={patient._id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.email} | {patient.phone} | DOB: {patient.dob}</p>
                </div>
                <div>
                  <button
                    onClick={() => openDetailsModal(patient)}
                    className="px-3 py-1 border border-gray-600 text-gray-700 rounded-md hover:bg-gray-50 transition text-sm mr-2"
                  >
                    Details
                  </button>
                  <Link
                    to={`/admin/patients/historyinfo?id=${patient._id}`}
                    className="px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition text-sm mr-2"
                  >
                    View History
                  </Link>
                  <button
                    onClick={() => openEditModal(patient)}
                    className="px-3 py-1 border border-yellow-600 text-yellow-600 rounded-md hover:bg-yellow-50 transition text-sm mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No patients found.</p>
        )}
      </div>

      {/* Details Modal */}
      {detailsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeDetailsModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Patient Details</h2>
            <div className="space-y-2">
              <div><span className="font-medium">Full Name:</span> {detailsData.name}</div>
              <div><span className="font-medium">Date of Birth:</span> {detailsData.dob}</div>
              <div><span className="font-medium">Gender:</span> {detailsData.gender}</div>
              <div><span className="font-medium">Contact Number:</span> {detailsData.phone}</div>
              <div><span className="font-medium">Email Address:</span> {detailsData.email}</div>
              <div><span className="font-medium">Home Address:</span> {detailsData.address}</div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeEditModal}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Edit Patient</h2>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input id="name" type="text" required value={editData.name} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="dob" className="block mb-1 text-sm font-medium text-gray-700">Date of Birth</label>
                <input id="dob" type="date" required value={editData.dob} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-1 text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" required value={editData.gender} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">Contact Number</label>
                <input id="phone" type="tel" required value={editData.phone} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
                <input id="email" type="email" required value={editData.email} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">Home Address</label>
                <textarea id="address" required value={editData.address} onChange={handleEditChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md resize-none" rows={2} />
              </div>
              {editError && <div className="text-red-600 text-sm">{editError}</div>}
              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium" disabled={editLoading}>
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;