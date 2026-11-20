import React, { useState, useEffect } from 'react';
import {
  MdSchool,
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdRefresh,
} from 'react-icons/md';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import toast, { Toaster } from 'react-hot-toast';
import AuthorizationHeader from '../AuthorizationHeader';


const QualificationManagement = () => {
  const [qualifications, setQualifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
   const [confirmDelete, setConfirmDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingQualification, setEditingQualification] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch qualifications from API
  const fetchQualifications = () => {
    setIsLoading(true);
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLQUALIFICATIONS)
      .then(response => {
        if (response.data.status === 200) {
          // Transform API response to match our expected format
          const transformedData = response.data.data.map((item, index) => ({
            id: index + 1,
            name: item.qualification_name 
          }));
          setQualifications(transformedData);
        }
      })
      .catch(error => {
        console.error('Error fetching qualifications:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  const handleAdd = () => {
    setEditingQualification(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingQualification(item);
    setFormData({ name: item.name });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDELETEQUALIFICATION, {
      params: { id }
    })  
    .then(response => {
      if (response.data.status === 200) {
        setQualifications(prev => prev.filter(q => q.id !== id));
        setConfirmDelete(null);
        toast.success('Qualification deleted successfully');
      }
    })
    .catch(error => {
      console.error('Error deleting qualification:', error);
    });
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingQualification) {
      // Update existing qualification
      AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEQUALIFICATION, {
        params: {
          qualification: formData.name.trim(),
          id: editingQualification.id
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          fetchQualifications(); 
          setShowModal(false);
          toast.success('Qualification updated successfully');
        }
      })
      .catch(error => {
        console.error('Error updating qualification:', error);
      });
    } else {
      // Add new qualification
      AuthorizationHeader.get(API_ENDPOINTS.SUPERADMININSERTNEWQUALIFICATION, {
        params: {
          qualification: formData.name.trim()
        }
      })
      .then(response => {
        if (response.data.status === 200) {
          fetchQualifications();
          setShowModal(false);
          toast.success('Qualification added successfully');
          setFormData({ name: '' });
        }
      })
      .catch(error => {
        console.error('Error adding qualification:', error);
      });
    }
  };

  const filteredQualifications = qualifications.filter(q =>
    q.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MdRefresh className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading qualifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MdSchool className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Qualification Management</h1>
                <p className="text-gray-600">Manage academic qualifications</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={fetchQualifications}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <MdRefresh className="w-5 h-5" />
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <MdAdd className="w-5 h-5" />
                <span>Add Qualification</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="relative w-1/3">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search qualifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {filteredQualifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MdSchool className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No qualifications found</h3>
            <p className="text-gray-600 mb-6">Try a different search or add a new one.</p>
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Qualification
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredQualifications.map((q, index) => (
              <div key={q.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 ${index !== filteredQualifications.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <h3 className="text-lg text-gray-800">{q.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(q)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(q)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-transform duration-300 scale-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
                  aria-label="Cancel deletion"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200"
                  aria-label="Confirm deletion"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingQualification ? 'Edit Qualification' : 'Add Qualification'}
              </h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MCA"
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingQualification ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationManagement;