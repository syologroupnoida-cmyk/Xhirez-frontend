import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'react-hot-toast';
import { API_ENDPOINTS } from '../apiConfig';
import axios from 'axios';
import AuthorizationHeader from '../AuthorizationHeader';

const BuisnessRequest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('full_name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

   const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINBUSINESSREQUEST)
      if (response?.data?.status === 200) {
        setUsers(response.data.data);
      } else {
        throw new Error(response?.data?.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

 const handleSort = (header) => {
  const fieldMap = {
    ID: 'id',
    Name: 'full_name',
    Email: 'email_id',
    'Company Name': 'company_name',
    'Mobile No': 'phone_no',
    'Req Date': 'create_date',
    City: 'city',
    Designation: 'designation',
  };
  const field = fieldMap[header];
  if (!field) return;

  const isAsc = sortField === field && sortOrder === 'asc';
  setSortField(field);
  setSortOrder(isAsc ? 'desc' : 'asc');
};

  const filteredUsers = users
    .filter(
      (user) =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // .sort((a, b) => {
    //   const aValue = a[sortField] || '';
    //   const bValue = b[sortField] || '';
    //   return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    // });

 const exportToExcel = () => {
  const exportData = filteredUsers.map(
    ({ id, full_name, email_id, company_name, phone_no, create_date, city, designation }) => ({
      ID: id || 'N/A',
      Name: full_name || 'N/A',
      Email: email_id || 'N/A',
      'Company Name': company_name || 'N/A',
      'Mobile No': phone_no || 'N/A',
      'Request Date': create_date || 'N/A',
      City: city || 'N/A',
      Designation: designation || 'N/A',
    })
  );
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Business Requests');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(fileData, 'Business_Requests.xlsx');
  toast.success('Excel file exported!');
};


  if (loading) {
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
      <Toaster position="top-right" />
      <div className="max-w-9xl mx-auto">
        <h5 className="text-3xl font-bold text-gray-900 mb-4">Business Requests</h5>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                aria-label="Search users"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
              aria-label="Export users to Excel"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to Excel
            </button>
          </div>

          {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {['Name', 'Email', 'Company Name', 'Mobile No','Req Date','City', 'Designation'].map((header) => (
                  <th
                    key={header}
                    onClick={() => header !== 'Actions' && handleSort(header.toLowerCase().replace(' ', '_'))}
                    className={`px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider ${
                      header !== 'Actions' ? 'cursor-pointer hover:text-gray-900' : ''
                    }`}
                  >
                    {header}
                    {sortField === header.toLowerCase().replace(' ', '_') && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email_id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.company_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone_no}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.create_date || 'N/A'}</td>
                     <td className="px-6 py-4 text-sm text-gray-600">{user.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.designation || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-lg">No users found.</div>
          ) : (
            filteredUsers.map((user, index) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">{user.full_name || 'N/A'}</p>
                </div>
                    <p className="text-sm text-gray-600">{user.email_id}</p>
                    <p className="text-sm text-gray-600">{user.company_name || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{user.city}</p>
                    <p className="text-sm text-gray-600">{user.designation || 'N/A'}</p>

              </div>
            ))
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default BuisnessRequest;