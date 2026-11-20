import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, User, Search } from 'react-feather';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { API_ENDPOINTS } from '../apiConfig';
import AuthorizationHeader from '../AuthorizationHeader';

const SuperAdminManagement = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [superAdminToDelete, setSuperAdminToDelete] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    mobileNo: '',
    status: '0',
  });
  const [formLoading, setFormLoading] = useState(false);


  const authData = sessionStorage.getItem("authToken");
  const user = authData ? JSON.parse(authData).users : null;

  // Fetch super admins
  const fetchSuperAdmins = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLACCOUNTS,{
        params:{
          email : user?.email || ''
        }
      });
      if (response.data.status === 200) {
        const transformedAdmins = response.data.data.map((item) => ({
          id: item.id,
          full_name: item.full_name?.trim() || 'Unknown',
          email: item.email?.trim() || 'Unknown',
          password: item.password || '',
          created_at: item.created_at || 'Unknown',
          mobileNo: item.phone_number || 'N/A',
          status: item.status !== null && item.status !== '' && item.status !== undefined ? Number(item.status) : 0,
        }));
        setSuperAdmins(transformedAdmins);
      } else {
        toast.error(response.data.statusText || 'Failed to fetch SuperAdmins');
      }
    } catch (error) {
      console.error('Error fetching SuperAdmins:', error);
      toast.error(error.response?.data?.message || 'Error fetching SuperAdmins');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuperAdmins();
  }, [fetchSuperAdmins]);

  // Filter super admins
  const filteredAdmins = superAdmins.filter((admin) => {
    const matchesSearch =
      admin.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && (admin.status === 0 || admin.status === '0' || admin.status === null || admin.status === '')) ||
      (statusFilter === 'inactive' && admin.status === 1);
    return matchesSearch && matchesStatus;
  });

  // Handle add/edit modal
  const handleAddClick = () => {
    setEditingAdmin(null);
    setFormData({ full_name: '', email: '', password: '', mobileNo: '', status: '0' });
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = () => {
    if (!formData.full_name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Please enter a valid email');
      return false;
    }

        if (!/^\d{10}$/.test(formData.mobileNo)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!editingAdmin && !formData.password) {
      toast.error('Password is required for new SuperAdmins');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSaveAdmin = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        status: formData.status,
        mobileNo: formData.mobileNo.trim(),
        ...(formData.password && { password: formData.password }),
      };

      if (editingAdmin) {
        // Update status and details
        const statusResponse = await AuthorizationHeader.get(API_ENDPOINTS.UPDATESUPERADMINACTIVESTATUS, {
          params: {
            email: editingAdmin.email,
            status: payload.status,
          },
        });
        if (statusResponse.data.status === 200 && detailsResponse.data.status === 200) {
          setSuperAdmins(
            superAdmins.map((sa) =>
              sa.email === editingAdmin.email
                ? { ...sa, full_name: payload.full_name, email: payload.email, status: payload.status }
                : sa
            )
          );
          toast.success(detailsResponse.data.statusText || 'SuperAdmin updated successfully');
          setShowModal(false);
        } else {
          toast.error(
            detailsResponse.data.statusText || statusResponse.data.statusText || 'Failed to update SuperAdmin'
          );
        }
      } else {
        // Create new super admin
        const response = await AuthorizationHeader.get(API_ENDPOINTS.CREATESUPERADMINNEWACCOUNT, {
          params: {
            name: payload.full_name,
            email: payload.email,
            password: payload.password,
            mobileNo: payload.mobileNo || '',
            status: '0',
          },
        });

        if (response.data.status === 200) {
          const newAdmin = {
            id: response.data.data?.id || superAdmins.length + 1,
            full_name: payload.full_name?.trim() || 'Unknown',
            email: payload.email?.trim() || 'Unknown',
            created_at: new Date().toISOString(),
            mobileNo: payload.mobileNo || 'N/A',
            status: 0,
          };

          setSuperAdmins([...superAdmins, newAdmin]);

          toast.success(response.data.statusText || 'SuperAdmin added successfully');
          setShowModal(false);
        } else {
          toast.error(response.data.statusText || 'Failed to add SuperAdmin');
        }
      }
    } catch (error) {
      console.error('Error saving SuperAdmin:', error);
      toast.error(error.response?.data?.message || 'Error saving SuperAdmin');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle status toggle
  const handleToggleStatus = async (admin) => {
    const newStatus = admin.status === 0 ? 1 : 0;
    setFormLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.UPDATESUPERADMINACTIVESTATUS, {
        params: {
          email: admin.email,
          status: newStatus,
        },
      });
      if (response.data.status === 200) {
        setSuperAdmins(
          superAdmins.map((sa) =>
            sa.id === admin.id ? { ...sa, status: newStatus } : sa
          )
        );
        toast.success(response.data.statusText || `SuperAdmin ${newStatus === 0 ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error(response.data.statusText || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error(error.response?.data?.message || 'Error toggling status');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete
  const handleDeleteAdmin = (admin) => {
    setSuperAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setFormLoading(true);
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.UPDATESUPERADMINACTIONSTATUS, {
        params: {
          email: superAdminToDelete.email,
          status: '1',
        },
      });
      if (response.data.status === 200) {
        setSuperAdmins(superAdmins.filter((sa) => sa.email !== superAdminToDelete.email));
        toast.success(response.data.statusText || 'SuperAdmin deleted successfully');
        setShowDeleteModal(false);
      } else {
        toast.error(response.data.statusText || 'Failed to delete SuperAdmin');
      }
    } catch (error) {
      console.error('Error deleting SuperAdmin:', error);
      toast.error(error.response?.data?.message || 'Error deleting SuperAdmin');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchSuperAdmins();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">SuperAdmin Management</h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 text-sm sm:text-base"
                aria-label="Search SuperAdmins"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={handleAddClick}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
              aria-label="Add new SuperAdmin"
              disabled={formLoading}
            >
              <Plus className="h-5 w-5" />
              Add SuperAdmin
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Mobile No</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
                      No SuperAdmins found.
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">{admin.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{admin.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{admin.mobileNo}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{formatDate(admin.created_at)}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(admin)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            admin.status === 0
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          } transition duration-200`}
                          disabled={formLoading}
                          aria-label={`Toggle status for ${admin.full_name} to ${admin.status === 0 ? 'inactive' : 'active'}`}
                        >
                          {admin.status === 0 ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center flex-wrap gap-2">
                          <button
                            onClick={() => handleDeleteAdmin(admin)}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-red-600 hover:bg-gray-200 transition text-sm"
                            aria-label={`Delete ${admin.full_name}`}
                            disabled={formLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            {filteredAdmins.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-lg">No SuperAdmins found.</div>
            ) : (
              filteredAdmins.map((admin, index) => (
                <div key={admin.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                     <h3 className="text-lg font-medium text-gray-900">{admin.full_name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        admin.status === 0
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {admin.status === 0 ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                  <p className="text-sm text-gray-600 mt-1">Mobile: {admin.mobileNo}</p>
                  <p className="text-sm text-gray-600 mt-1">Created: {formatDate(admin.created_at)}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleToggleStatus(admin)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        admin.status === 0
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      } ${formLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={formLoading}
                    >
                      {admin.status === 0 ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
                      disabled={formLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingAdmin ? 'Edit SuperAdmin' : 'Add New SuperAdmin'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close modal"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="full_name">
                    Full Name *
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter full name"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="email">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter email"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="password">
                    {editingAdmin ? 'New Password (optional)' : 'Password *'}
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter password"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="mobileNo">
                    Mobile Number *
                  </label>
                  <input
                    id="mobileNo"
                    type="number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.length <= 10) {
                        handleInputChange(e);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter Mobile Number"
                    required
                    aria-required="true"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm sm:text-base"
                  aria-label="Cancel"
                  disabled={formLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdmin}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  aria-label={editingAdmin ? 'Update SuperAdmin' : 'Add SuperAdmin'}
                  disabled={formLoading || !formData.full_name.trim() || !formData.email.trim() || (!editingAdmin && !formData.password)}
                >
                  {formLoading ? (
                    <span className="flex items-center">
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </span>
                  ) : editingAdmin ? (
                    'Update'
                  ) : (
                    'Add'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete <strong>{superAdminToDelete?.full_name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm sm:text-base"
                  aria-label="Cancel deletion"
                  disabled={formLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  aria-label={`Confirm delete ${superAdminToDelete?.full_name}`}
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <span className="flex items-center">
                      <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                      Deleting...
                    </span>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminManagement;