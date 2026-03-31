// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import { Toaster, toast } from 'react-hot-toast';
// import axios from 'axios';
// import { API_ENDPOINTS } from '../apiConfig';
// import AuthorizationHeader from '../AuthorizationHeader';

// const AdminProfileManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [updatingStatus, setUpdatingStatus] = useState(null);
//   const [updatingRole, setUpdatingRole] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortField, setSortField] = useState('full_name');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [viewUser, setViewUser] = useState(null);

//   useEffect(() => {
//     fetchAllAdmins();
//   }, []);

//   const fetchAllAdmins = async () => {
//     try {
//       setLoading(true);
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLADMIN, {
//         params: { userRole: 'admin' }
//       });
      
//       if (response.data.status === 200) {
//         setUsers(response.data.data);
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch recruiters');
//       }
//     } catch (error) {
//       console.error('Error fetching recruiters:', error);
//       toast.error(error.message || 'Failed to fetch recruiters.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleUserStatus = async (userId, email) => {
//     try {
//       setUpdatingStatus(userId);
      
//       const currentUser = users.find(user => user.id === userId);
//       const newStatus = currentUser.status === '1' ? '0' : '1';
      
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEADMINACTIVESTATUS, {
//         params: {
//           email: email,
//           status: newStatus
//         }
//       });

//       if (response.data.status === 200) {
//         const updatedUsers = users.map(user => 
//           user.id === userId ? { ...user, status: newStatus } : user
//         );
//         setUsers(updatedUsers);
//         toast.success(`Recruiter ${newStatus === '0' ? 'activated' : 'suspended'} successfully!`);
//       } else {
//         throw new Error(response.data.message || 'Failed to update status');
//       }
//     } catch (error) {
//       console.error('Error updating recruiter status:', error);
//       toast.error(error.message || 'Failed to update recruiter status.');
//     } finally {
//       setUpdatingStatus(null);
//     }
//   };

//   const updateUserRole = async (userId, email, newRole) => {
//     try {
//       setUpdatingRole(userId);
      
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEADMINROLE, {
//         params: {
//           email: email,
//           userRole: newRole
//         }
//       });

//       if (response.data.status === 200) {
//         const updatedUsers = users.map(user => 
//           user.id === userId ? { ...user, userrole: newRole } : user
//         );
//         setUsers(updatedUsers);
//         toast.success('User role updated successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to update role');
//       }
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       toast.error(error.message || 'Failed to update user role.');
//     } finally {
//       setUpdatingRole(null);
//     }
//   };

//   const deleteUser = async (userId, email) => {
//     try {
//       const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEDELETIONACTION, {
//         params: {
//           email: email,
//           status: "0"
//         }
//       });

//       if (response.data.status === 200) {
//         const filtered = users.filter(user => user.id !== userId);
//         setUsers(filtered);
//         setConfirmDelete(null);
//         toast.success('Recruiter deleted successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to delete recruiter');
//       }
//     } catch (error) {
//       console.error('Error deleting recruiter:', error);
//       toast.error(error.message || 'Failed to delete recruiter.');
//     }
//   };

//   const handleViewDetails = (user) => {
//     setViewUser(user);
//   };

//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortOrder === 'asc';
//     setSortField(field);
//     setSortOrder(isAsc ? 'desc' : 'asc');
//   };

//   const filteredUsers = users
//     .filter(user => 
//       user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     // .sort((a, b) => {
//     //   const aValue = a[sortField] || '';
//     //   const bValue = b[sortField] || '';
//     //   return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
//     // });

//   const exportToExcel = () => {
//     const exportData = filteredUsers.map(({ id, full_name, email, userrole, status }) => ({
//       ID: id,
//       Name: full_name,
//       Email: email,
//       UserRole: userrole,
//       Status: status === '0' ? 'Active' : 'Inactive'
//     }));
    
//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Recruiters');
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     saveAs(fileData, 'Recruiters_List.xlsx');
//     toast.success('Excel file exported!');
//   };

//   // Helper functions
//   const getStatusDisplay = (status) => status === '0' ? 'Active' : 'Inactive';

//   const getStatusClass = (status) =>
//     status === '0'
//       ? 'bg-green-100 text-green-600 hover:bg-green-200'
//       : 'bg-gray-100 text-gray-600 hover:bg-gray-200';

//   const getActionText = (status) =>
//     status === '0' ? 'Suspend' : 'Activate';

//   const getActionClass = (status) =>
//     status === '0' ? '' : 'text-green-600 hover:underline';

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <div className="max-w-4xl w-full space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
//               <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
//       <Toaster position="top-right" />
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruiter Management</h1>
        
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
//             <div className="relative w-full sm:w-80">
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
//               />
//               <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               {searchTerm && (
//                 <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
//                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               )}
//             </div>
//             <button
//               onClick={exportToExcel}
//               className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
//             >
//               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               Export to Excel
//             </button>
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100 sticky top-0">
//                 <tr>
//                   {['ID', 'Name', 'Email', 'User Role', 'Status', 'Actions'].map((header) => (
//                     <th
//                       key={header}
//                       onClick={() => header !== 'Actions' && handleSort(header.toLowerCase().replace(' ', '_'))}
//                       className={`px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider ${
//                         header !== 'Actions' ? 'cursor-pointer hover:text-gray-900' : ''
//                       }`}
//                     >
//                       {header}
//                       {sortField === header.toLowerCase().replace(' ', '_') && (
//                         <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredUsers.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-lg">
//                       No recruiters found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredUsers.map((user, index) => (
//                     <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
//                       <td className="px-6 py-4 text-sm text-gray-600 text-center">{index + 1}</td>
//                       <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">{user.full_name || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600 text-center">{user.email || 'N/A'}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600 text-center">
//                         <select
//                           value={user.userrole || ''}
//                           onChange={(e) => updateUserRole(user.id, user.email, e.target.value)}
//                           disabled={updatingRole === user.id}
//                           className={`bg-white border border-gray-300 rounded px-2 py-1 text-sm ${updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                         >
//                           <option value="admin">Admin</option>
//                           <option value="primeadmin">Prime Admin</option>
//                         </select>
//                         {updatingRole === user.id && (
//                           <span className="ml-2 text-xs text-gray-500">Updating...</span>
//                         )}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(user.status)}`}>
//                           {getStatusDisplay(user.status)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex justify-center flex-wrap gap-2">
//                           <button
//                             onClick={() => handleViewDetails(user)}
//                             className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
//                           >
//                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                             </svg>
//                             View
//                           </button>
//                           <button
//                             onClick={() => toggleUserStatus(user.id, user.email)}
//                             disabled={updatingStatus === user.id}
//                             className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition
//                               ${user.status === '0' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}
//                               ${updatingStatus === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
//                           >
//                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               {user.status === '0' ? (
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.414 1.414A8 8 0 005.636 18.364l-1.414-1.414a10 10 0 0114.142-14.142z" />
//                               ) : (
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                               )}
//                             </svg>
//                             <span className={user.status === '0' ? 'text-gray-800' : 'text-green-600'}>
//                               {user.status === '0' ? 'Suspend' : 'Activate'}
//                             </span>
//                           </button>

//                           <button
//                             onClick={() => setConfirmDelete(user)}
//                             className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-red-600 hover:bg-gray-200 transition text-sm"
//                           >
//                             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-7 4h18" />
//                             </svg>
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card Layout */}
//           <div className="md:hidden space-y-4">
//             {filteredUsers.length === 0 ? (
//               <div className="text-center py-8 text-gray-500 text-lg">No recruiters found.</div>
//             ) : (
//               filteredUsers.map((user, index) => (
//                 <div key={user.id} className="bg-white p-4 rounded-lg shadow">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-semibold text-gray-600">#{index + 1}</span>
//                     <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(user.status)}`}>
//                       {getStatusDisplay(user.status)}
//                     </span>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900">{user.full_name || 'N/A'}</h3>
//                   <p className="text-sm text-gray-600">{user.email || 'N/A'}</p>
//                   <div className="mt-2">
//                     <label className="text-sm font-medium text-gray-500">User Role:</label>
//                     <select
//                       value={user.userrole || ''}
//                       onChange={(e) => updateUserRole(user.id, user.email, e.target.value)}
//                       disabled={updatingRole === user.id}
//                       className={`w-full mt-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm ${updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                     >
//                       <option value="admin">Admin</option>
//                       <option value="primeadmin">Prime Admin</option>
//                     </select>
//                     {updatingRole === user.id && (
//                       <span className="text-xs text-gray-500">Updating role...</span>
//                     )}
//                   </div>
//                   <div className="flex gap-2 mt-4">
//                     <button
//                       onClick={() => handleViewDetails(user)}
//                       className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
//                     >
//                       View Details
//                     </button>
//                     <button
//                       onClick={() => toggleUserStatus(user.id, user.email)}
//                       disabled={updatingStatus === user.id}
//                       className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
//                         getStatusClass(user.status)
//                       } ${updatingStatus === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
//                     >
//                       {getActionText(user.status)}
//                     </button>
//                     <button
//                       onClick={() => setConfirmDelete(user)}
//                       className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* View Details Modal */}
//         {viewUser && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-900">Recruiter Details</h3>
//                 <button 
//                   onClick={() => setViewUser(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
//                   <p className="mt-1 text-sm text-gray-900">{viewUser.full_name || 'N/A'}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Email</h4>
//                   <p className="mt-1 text-sm text-gray-900">{viewUser.email || 'N/A'}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">User Role</h4>
//                   <p className="mt-1 text-sm text-gray-900">{viewUser.userrole || 'N/A'}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Status</h4>
//                   <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(viewUser.status)}`}>
//                     {getStatusDisplay(viewUser.status)}
//                   </span>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500">Registration Date</h4>
//                   <p className="mt-1 text-sm text-gray-900">
//                     {viewUser.created_at ? new Date(viewUser.created_at).toLocaleDateString() : 'N/A'}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={() => setViewUser(null)}
//                   className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {confirmDelete && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
//               <p className="text-sm text-gray-600 mb-6">
//                 Are you sure you want to delete <strong>{confirmDelete.full_name}</strong>? This action cannot be undone.
//               </p>
//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setConfirmDelete(null)}
//                   className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => deleteUser(confirmDelete.id, confirmDelete.email)}
//                   className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProfileManagement;









import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import AuthorizationHeader from '../AuthorizationHeader';

const AdminProfileManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [updatingRole, setUpdatingRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('full_name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const fetchAllAdmins = async () => {
    try {
      setLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLADMIN, {
        params: { userRole: 'admin' }
      });
      
      if (response.data.status === 200) {
        setUsers(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch recruiters');
      }
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      toast.error(error.message || 'Failed to fetch recruiters.');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, email) => {
    try {
      setUpdatingStatus(userId);
      
      const currentUser = users.find(user => user.id === userId);
      const newStatus = currentUser.status === '1' ? '0' : '1';
      
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEADMINACTIVESTATUS, {
        params: {
          email: email,
          status: newStatus
        }
      });

      if (response.data.status === 200) {
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
        toast.success(`Recruiter ${newStatus === '0' ? 'activated' : 'suspended'} successfully!`);
      } else {
        throw new Error(response.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating recruiter status:', error);
      toast.error(error.message || 'Failed to update recruiter status.');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const updateUserRole = async (userId, email, newRole) => {
    try {
      setUpdatingRole(userId);
      
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEADMINROLE, {
        params: {
          email: email,
          userRole: newRole
        }
      });

      if (response.data.status === 200) {
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, userrole: newRole } : user
        );
        setUsers(updatedUsers);
        toast.success('User role updated successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error(error.message || 'Failed to update user role.');
    } finally {
      setUpdatingRole(null);
    }
  };

  const deleteUser = async (userId, email) => {
    try {
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATEDELETIONACTION, {
        params: {
          email: email,
          status: "1"
        }
      });

      if (response.data.status === 200) {
        const filtered = users.filter(user => user.id !== userId);
        setUsers(filtered);
        setConfirmDelete(null);
        toast.success('Recruiter deleted successfully!');
      } else {
        throw new Error(response.data.message || 'Failed to delete recruiter');
      }
    } catch (error) {
      console.error('Error deleting recruiter:', error);
      toast.error(error.message || 'Failed to delete recruiter.');
    }
  };

  const handleViewDetails = (user) => {
    setViewUser(user);
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortField(field);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  const filteredUsers = users
    .filter(user => 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

  const exportToExcel = () => {
    const exportData = filteredUsers.map(({ id, full_name, email, userrole, status }) => ({
      ID: id,
      Name: full_name,
      Email: email,
      UserRole: userrole,
      Status: status === '0' ? 'Active' : 'Inactive'
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Recruiters');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'Recruiters_List.xlsx');
    toast.success('Excel file exported!');
  };

  // Helper functions
  const getStatusDisplay = (status) => status === '0' ? 'Active' : 'Inactive';

  const getStatusClass = (status) =>
    status === '0'
      ? 'bg-green-100 text-green-600 hover:bg-green-200'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200';

  const getActionText = (status) =>
    status === '0' ? 'Suspend' : 'Activate';

  const getActionClass = (status) =>
    status === '0' ? '' : 'text-green-600 hover:underline';

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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Recruiter Management</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
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
                  {['Name', 'Email', 'User Role', 'Status', 'Actions'].map((header) => (
                    <th
                      key={header}
                      onClick={() => header !== 'Actions' && handleSort(header.toLowerCase().replace(' ', '_'))}
                      className={`px-6 py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider ${
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
                      No recruiters found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">{user.full_name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-center">
                        <select
                          value={user.userrole || ''}
                          onChange={(e) => updateUserRole(user.id, user.email, e.target.value)}
                          disabled={updatingRole === user.id}
                          className={`bg-white border border-gray-300 rounded px-2 py-1 text-sm ${updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <option value="admin">Admin</option>
                          <option value="primeadmin">Prime Admin</option>
                        </select>
                        {updatingRole === user.id && (
                          <span className="ml-2 text-xs text-gray-500">Updating...</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(user.status)}`}>
                          {getStatusDisplay(user.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center flex-wrap gap-2">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id, user.email)}
                            disabled={updatingStatus === user.id}
                            className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium transition
                              ${user.status === '0' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}
                              ${updatingStatus === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {user.status === '0' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.414 1.414A8 8 0 005.636 18.364l-1.414-1.414a10 10 0 0114.142-14.142z" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              )}
                            </svg>
                            <span className={user.status === '0' ? 'text-gray-800' : 'text-green-600'}>
                              {user.status === '0' ? 'Suspend' : 'Activate'}
                            </span>
                          </button>

                          <button
                            onClick={() => setConfirmDelete(user)}
                            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-100 text-red-600 hover:bg-gray-200 transition text-sm"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-7 4h18" />
                            </svg>
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
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-lg">No recruiters found.</div>
            ) : (
              filteredUsers.map((user, index) => (
                <div key={user.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{user.full_name || 'N/A'}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusClass(user.status)}`}>
                      {getStatusDisplay(user.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">{user.email || 'N/A'}</p>
                  <div className="mt-2">
                    <label className="text-sm font-medium text-gray-500">User Role:</label>
                    <select
                      value={user.userrole || ''}
                      onChange={(e) => updateUserRole(user.id, user.email, e.target.value)}
                      disabled={updatingRole === user.id}
                      className={`w-full mt-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm ${updatingRole === user.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <option value="admin">Admin</option>
                      <option value="primeadmin">Prime Admin</option>
                    </select>
                    {updatingRole === user.id && (
                      <span className="text-xs text-gray-500">Updating role...</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id, user.email)}
                      disabled={updatingStatus === user.id}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        getStatusClass(user.status)
                      } ${updatingStatus === user.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {getActionText(user.status)}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(user)}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* View Details Modal */}
        {viewUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">Recruiter Details</h3>
                <button 
                  onClick={() => setViewUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                  <p className="mt-1 text-sm text-gray-900">{viewUser.full_name || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p className="mt-1 text-sm text-gray-900">{viewUser.email || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">User Role</h4>
                  <p className="mt-1 text-sm text-gray-900">{viewUser.userrole || 'N/A'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(viewUser.status)}`}>
                    {getStatusDisplay(viewUser.status)}
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Registration Date</h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {viewUser.created_at ? new Date(viewUser.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewUser(null)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete <strong>{confirmDelete.full_name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteUser(confirmDelete.id, confirmDelete.email)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileManagement;