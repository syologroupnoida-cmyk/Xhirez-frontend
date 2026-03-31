import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MdBusiness,
  MdSearch,
  MdAdd,
  MdEdit,
  MdDelete,
  MdRefresh,
} from 'react-icons/md';
import { API_ENDPOINTS } from '../apiConfig';
import toast from 'react-hot-toast';
import AuthorizationHeader from '../AuthorizationHeader';



const IndustryManagement = () => {
  const [industries, setIndustries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      setIsLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLINDUSTRIES);
      if (response.data.status === 200) {
        setIndustries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching industries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIndustry = () => {
    setEditingIndustry(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleEditIndustry = (industry) => {
    setEditingIndustry(industry);
    setFormData({ name: industry.industry });
    setShowModal(true);
  };

  const handleSaveIndustry = async () => {
    if (!formData.name.trim()) return;

    try {
      if (editingIndustry) {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEINDUSTRY, {
          params: {
            id: editingIndustry.id,
            industry: formData.name
          }
        });

        if (response.data.status === 200) {
          setIndustries(prev =>
            prev.map(ind =>
              ind.id === editingIndustry.id ? { ...ind, industry: formData.name } : ind
            )
          );
          toast.success('Industry updated successfully');
        }
      } else {
        // Add new industry
        const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMININSERTNEWINDUSTRY, {
          params: {
            industryName: formData.name
          }
        });

        if (response.data.status === 200) {
         const newIndustry = { industry: formData.name };
          setIndustries(prev => [...prev, newIndustry]);
          toast.success('Industry added successfully');
        }
        else{
          toast.error('Failed to add industry');
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving industry:', error);
    }
  };

  const handleDeleteIndustry = async (id) => {
    
      try {
        const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINDELETEINDUSTRY, {
          params: { id: id }
        });

        if (response.data.status === 200) {
          setIndustries(prev => prev.filter(ind => ind.id !== id));
          setConfirmDelete(null);
          toast.success('Industry deleted successfully');
        }
        else {
          toast.error('Failed to delete industry');
        }
      } catch (error) {
        console.error('Error deleting industry:', error);
      }
  };

  const filteredIndustries = industries.filter(ind =>
  ind?.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MdBusiness className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Industry Management</h1>
                <p className="text-gray-600">Manage industry names</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={fetchIndustries} 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                disabled={isLoading}
              >
                <MdRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleAddIndustry}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <MdAdd className="w-5 h-5" />
                <span>Add Industry</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="relative w-1/4">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : filteredIndustries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MdBusiness className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No industries found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or add a new industry</p>
            <button
              onClick={handleAddIndustry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Industry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredIndustries.map((industry, index) => (
              <div key={industry.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 ${index !== filteredIndustries.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <h3 className="text-lg font-medium text-gray-900">{industry?.industry}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditIndustry(industry)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(industry)}
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
                Are you sure you want to delete <strong>{confirmDelete.industry}</strong>? This action cannot be undone.
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
                  onClick={() => handleDeleteIndustry(confirmDelete.id)}
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
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingIndustry ? 'Edit Industry' : 'Add New Industry'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Healthcare, IT"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIndustry}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingIndustry ? 'Update' : 'Save'} Industry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryManagement;