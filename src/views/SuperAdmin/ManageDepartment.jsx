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
import toast, { Toaster } from 'react-hot-toast';
import AuthorizationHeader from '../AuthorizationHeader';

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLDEPARTMENTS);
      if (response.data.status === 200) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setFormData({ name: department.Department });
    setShowModal(true);
  };

  const handleSaveDepartment = async () => {
    
    if (!formData.name.trim()) return;

    try {
      if (editingDepartment) {

        // Update existing department
        const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEDEPARTMENT, {
          params: {
            id: editingDepartment.id,
            department: formData.name
          }
        });

        if (response.data.status === 200) {
          setDepartments(prev =>
            prev.map(dept =>
                dept.id === editingDepartment.id ? { ...dept, Department: formData.name } : dept
            )
            );

            setEditingDepartment(null);
            setFormData({ name: '' });

            toast.success('Department updated successfully!');
        }
      } else {
        // Add new department
        const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMININSERTNEWDEPARTMENT, {
          params: {
            department: formData.name
          }
        });

        if (response.data.status === 200) {
         const newDepartment = response.data.data;
            setDepartments(prev => [...prev, newDepartment]);
            setFormData({ name: '' });
            toast.success('Department added successfully!');
        }else {
          toast.error('Failed to add department. Please try again.');
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };


  const filteredDepartments = departments.filter(dept =>
    dept?.Department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MdBusiness className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
                <p className="text-gray-600">Manage department names</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={fetchDepartments} 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                disabled={isLoading}
              >
                <MdRefresh className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleAddDepartment}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <MdAdd className="w-5 h-5" />
                <span>Add Department</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="relative w-1/4">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments..."
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
        ) : filteredDepartments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <MdBusiness className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or add a new department</p>
            <button
              onClick={handleAddDepartment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Department
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredDepartments.map((department, index) => (
              <div key={department.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 ${index !== filteredDepartments.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <h3 className="text-lg font-medium text-gray-900">{department?.Department}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditDepartment(department)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  {/* <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., HR, Engineering"
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
                onClick={handleSaveDepartment}  
                disabled={!(formData.name || '').trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {editingDepartment ? 'Update' : 'Save'} Department
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartment;