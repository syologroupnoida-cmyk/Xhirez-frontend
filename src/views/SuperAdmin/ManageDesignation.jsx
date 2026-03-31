import React, { useState, useEffect } from 'react';
import { Search, Plus, Code, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { Toaster, toast } from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';
import AuthorizationHeader from '../AuthorizationHeader';


const ManageDesignation = () => {
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDesignation, setEditingDesignation] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  const fetchDesignations = () => {
    setIsLoading(true);
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLDESIGNATION)
      .then(response => {
        if(response.data.status === 200) {
          // Transform the API response to use JobTitle field
          const transformedDesignations = response.data.data.map ((item,index) => ({
           id: index + 1,
            name: item.JobTitle.trim(),
          }));
          setDesignations(transformedDesignations);
        } else {
          toast.error(response.data.statusText || 'Failed to fetch designations');
        }
      })
      .catch(error => {
        console.error('Error fetching designations:', error);
        toast.error('Error fetching designations');
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Filter designations
  const filteredDesignations = designations.filter(designation => {
    return designation.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddDesignation = () => {
    setEditingDesignation(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleEditDesignation = (designation) => {
    setEditingDesignation(designation);
    setFormData({ name: designation.name });
    setShowModal(true);
  };

  const handleSaveDesignation = () => {
    if (!formData.name.trim()) {
      toast.error('Designation name cannot be empty');
      return;
    }

     const designationData = {
     designation: formData.name.trim()
  };

    if (editingDesignation) {
      // Update existing designation
      AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEDESIGNATION, {
        params: {
          designation: designationData.designation,
          id: editingDesignation.id,
        }
      })
      .then(response => {
        if(response.data.status === 200) {
          toast.success(response.data.statusText || 'Designation updated successfully');
          fetchDesignations();
          setShowModal(false);
        } else {
          toast.error(response.data.statusText || 'Failed to update designation');
        }
      })
      .catch(error => {
        console.error('Error updating designation:', error);
        toast.error('Error updating designation');
      });
    } else {
      AuthorizationHeader.get(API_ENDPOINTS.SUPERADMININSERTNEWDESIGNATION, {
        params: {  
          jobTitle: designationData.designation,
        }
      })
      .then(response => {
        if(response.data.status === 200) {
          toast.success(response.data.statusText || 'Designation added successfully');
          fetchDesignations();
          setShowModal(false);
        } else if (response.data.status === 400) {
          toast.error('Designation already exists');
        } else {
          toast.error(response.data.statusText || 'Failed to add designation');
        }
      })
      .catch(error => {
        console.error('Error adding designation:', error);
        toast.error('Error adding designation');
      });
    }
  };

  const handleRefresh = () => {
    fetchDesignations();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading designations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Designation Management</h4>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRefresh}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAddDesignation}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Designation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="col-lg-12 p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search designations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Designations List */}
        {filteredDesignations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No designations found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria" 
                : "Add your first designation to get started"}
            </p>
            <button
              onClick={searchTerm 
                ? () => setSearchTerm('')
                : handleAddDesignation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {searchTerm ? 'Clear Search' : 'Add Designation'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredDesignations.map((designation, index) => (
              <div key={designation.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== filteredDesignations.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{designation.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditDesignation(designation)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingDesignation ? 'Edit Designation' : 'Add New Designation'}
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Manager, Developer"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDesignation}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingDesignation ? 'Update' : 'Save'} Designation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDesignation;