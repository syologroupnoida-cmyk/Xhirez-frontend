import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'react-hot-toast';
import { API_ENDPOINTS } from '../apiConfig';
import axios from 'axios';
import AuthorizationHeader from '../AuthorizationHeader';


const CampusbuddyData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINCAMPUSBUDDYREQUEST);
      if (response?.data?.status === 200) {
        setStudents(response.data.data);
      } else {
        throw new Error(response?.data?.message || 'Failed to load campus buddy data');
      }
    } catch (error) {
      console.error('Error fetching campus buddy data:', error);
      toast.error(error.message || 'Failed to load campus buddy data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (header) => {
    const fieldMap = {
      'ID': 'id',
      'Name': 'name',
      'Email': 'email',
      'Mobile No': 'whatsapp_no',
      'City': 'city',
      'College Name': 'college_name',
      'Degree': 'degree',
      'Year': 'year',
      'Designation': 'designation',
      'Interest': 'interest'
    };
    const field = fieldMap[header];
    if (!field) return;

    const isAsc = sortField === field && sortOrder === 'asc';
    setSortField(field);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const filteredStudents = students
    .filter((student) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (student.name?.toLowerCase().includes(searchLower)) ||
        (student.email?.toLowerCase().includes(searchLower)) ||
        (student.whatsapp_no?.toLowerCase().includes(searchLower)) ||
        (student.city?.toLowerCase().includes(searchLower)) ||
        (student.college_name?.toLowerCase().includes(searchLower)) ||
        (student.degree?.toLowerCase().includes(searchLower)) ||
        (student.designation?.toLowerCase().includes(searchLower)) ||
        (student.interest?.toLowerCase().includes(searchLower))
         );
    })
    // .sort((a, b) => {
    //   const aValue = a[sortField] || '';
    //   const bValue = b[sortField] || '';
    //   return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    // });

  const exportToExcel = () => {
    const exportData = filteredStudents.map(
      ({ id, name, email, whatsapp_no, city, college_name, degree, year, designation, interest }) => ({
        'ID': id || 'N/A',
        'Name': name || 'N/A',
        'Email': email || 'N/A',
        'Mobile No': whatsapp_no || 'N/A',
        'City': city || 'N/A',
        'College Name': college_name || 'N/A',
        'Degree': degree || 'N/A',
        'Year': year || 'N/A',
        'Designation': designation || 'N/A',
        'Interest': interest || 'N/A'
      })
    );
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Campus Buddy Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'Campus_Buddy_Data.xlsx');
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
        <h5 className="text-3xl font-bold text-gray-900 mb-4">Campus Buddy Data</h5>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by name, email, college, etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                aria-label="Search campus buddy data"
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
              aria-label="Export to Excel"
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
                  {['Name', 'Email', 'Mobile No', 'City', 'College Name', 'Degree', 'Year', 'Designation', 'Interest'].map((header) => (
                    <th
                      key={header}
                      onClick={() => handleSort(header)}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                    >
                      <div className="flex items-center">
                        {header}
                        {sortField === header.toLowerCase().replace(' ', '_') && (
                          <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="px-6 py-8 text-center text-gray-500 text-lg">
                      No campus buddy data found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.whatsapp_no || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.city || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.college_name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.degree || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.year || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.designation || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.interest || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-lg">No campus buddy data found.</div>
            ) : (
              filteredStudents.map((student, index) => (
                <div key={student.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{student.name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm">{student.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <p className="text-sm">{student.whatsapp_no || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">College</p>
                      <p className="text-sm">{student.college_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="text-sm">{student.degree || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year</p>
                      <p className="text-sm">{student.year || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Interest</p>
                      <p className="text-sm">{student.interest || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusbuddyData;