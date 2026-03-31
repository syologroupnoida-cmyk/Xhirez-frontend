import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Toaster, toast } from "react-hot-toast";
import { API_ENDPOINTS } from "../apiConfig";
import axios from "axios";
import AuthorizationHeader from '../AuthorizationHeader';


const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETCOMPANYDETAILSBYEMAIL);

      if (response.data.status === 200) {
        setCompanies(response.data.data);
      }
      else{
        setCompanies([]);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies");
      setLoading(false);
    }
    finally{
    setLoading(false);
    }
  };

  const toggleCompanyStatus = async (company) => {
    try {
      setUpdatingStatus(company.id);

      const newStatus = company.status === "0" ? "1" : "0";

      const response = await AuthorizationHeader.get(
        API_ENDPOINTS.SUPERADMINUPDATECOMPANYUSERSTATUS,
        {
          params: {
            email: company.company_email,
            status: newStatus,
          },
        }
      );

      if (response.data.status === 200) {
        const updatedCompanies = companies.map((c) =>
          c.id === company.id ? { ...c, status: newStatus } : c
        );

        setCompanies(updatedCompanies);
        setUpdatingStatus(null);
        toast.success("Company status updated!");
      } else {
        toast.error("Failed to update company status");
        setUpdatingStatus(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
      setUpdatingStatus(null);
    }
  };

  const deleteCompany = async (company) => {
    try {
      AuthorizationHeader
        .get(API_ENDPOINTS.SUPERADMINUPDATECOMPANYUSERACTIONSTATUS, {
          params: {
            email: company.company_email,
            status: "1",
          },
        })
        .then((response) => {
          if (response.data.status === 200) {
            const filtered = companies.filter((c) => c.id !== company.id);
            setCompanies(filtered);
            setConfirmDelete(null);
            toast.success("Company deleted successfully!");
          } else {
            toast.error("Failed to delete company");
          }
        })
        .catch((error) => {
          console.error("Error deleting company:", error);
          toast.error("Failed to delete company");
        });
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Failed to delete company");
    }
  };

  const getStatusDisplay = (status) =>
    status === "0" || status === null || status === "" ? "Active" : "Suspended";

  const getStatusClass = (status) =>
    status === "0" || status === null || status === ""
      ? "bg-green-100 text-green-600 hover:bg-green-200"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200";

  const getActionText = (status) =>
    status === "0" || status === null || status === ""
      ? "Deactivate"
      : "Activate";

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const filteredCompanies = companies
    .filter(
      (company) =>
        company.company_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        company.website_url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.company_email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    // .sort((a, b) => {
    //   const aValue = a[sortField] || "";
    //   const bValue = b[sortField] || "";
    //   return sortOrder === "asc"
    //     ? aValue.localeCompare(bValue)
    //     : bValue.localeCompare(aValue);
    // });

  const exportToExcel = () => {
    const exportData = filteredCompanies.map(
      ({
        company_name,
        company_email,
        contact_no,
        website_url,
        industry_type,
        status,
        publish_year,
        company_address,
        emp_count,
        contact_personName,
      }) => ({
        Name: company_name,
        Email: company_email,
        contact_no: contact_no || "-",
        Website: website_url,
        Industry: industry_type,
        Status: status === "0" ? "Active" : "Suspended",
        publish_year: publish_year || "-",
        company_address: company_address || "-",
        TotalEmployees: emp_count || "-",
        contact_personName: contact_personName || "-",
      })
    );
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "Companies_List.xlsx");
    toast.success("Excel file exported!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow animate-pulse"
            >
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Company Management
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by name, email or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                aria-label="Search companies"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
              aria-label="Export companies to Excel"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export to Excel
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {[
                    "ID",
                    "Name",
                    "Email",
                    "Website",
                    "Industry",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      onClick={() =>
                        header !== "Actions" && handleSort(header.toLowerCase())
                      }
                      className={`px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider ${
                        header !== "Actions"
                          ? "cursor-pointer hover:text-gray-900"
                          : ""
                      }`}
                    >
                      {header}
                      {sortField === header.toLowerCase() && (
                        <span className="ml-1">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-8 text-center text-gray-500 text-lg"
                    >
                      No companies found.
                    </td>
                  </tr>
                ) : (
                  filteredCompanies.map((company, index) => (
                    <tr
                      key={company.id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {company.company_name || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {company.company_email || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {company.website_url || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {company.industry_type || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleCompanyStatus(company)}
                          disabled={updatingStatus === company.id}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${getStatusClass(
                            company.status
                          )} ${
                            updatingStatus === company.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label={`Toggle status for ${company.name}`}
                        >
                          {getStatusDisplay(company.status)}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setConfirmDelete(company)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition duration-200 text-sm"
                          aria-label={`Delete ${company.company_name}`}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1zm-7 4h18"
                            />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4">
            {filteredCompanies.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-lg">
                No companies found.
              </div>
            ) : (
              filteredCompanies.map((company, index) => (
                <div
                  key={company.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      #{index + 1}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                        company.status
                      ).replace("hover:", "")}`}
                    >
                      {getStatusDisplay(company.status)}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {company.company_name || "-"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {company.company_email || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {company.website_url || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {company.industry_type || "-"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => toggleCompanyStatus(company)}
                      disabled={updatingStatus === company.id}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${getStatusClass(
                        company.status
                      )} ${
                        updatingStatus === company.id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      aria-label={`Toggle status for ${company.name}`}
                    >
                      {getActionText(company.status)}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(company)}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition duration-200 text-sm"
                      aria-label={`Delete ${company.company_name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-transform duration-300 scale-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <strong>{confirmDelete.name}</strong>? This action cannot be
                undone.
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
                  onClick={() => deleteCompany(confirmDelete)}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200"
                  aria-label="Confirm deletion"
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

export default CompanyManagement;
