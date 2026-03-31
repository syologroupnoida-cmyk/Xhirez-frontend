import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MapPin,
  Award,
  BookOpen,
  Tags,
  Building2,
  Network,
  Factory,
  Search,
  Settings,
  Bell,
  Menu,
  X,
  Database,
  Sparkles,
  UserX,
  XCircle
} from 'lucide-react';


const modules = [
 { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, path: '/SuperAdmin' },
  { id: 'users', name: 'Users Management', icon: Users, path: '/SuperAdmin/users' },
  { id: 'Profile', name: 'Recruitment Management', icon: Settings, path: '/SuperAdmin/profileManagement' },
  { id: 'BuisnessRequest', name: 'Business Requests', icon: Bell, path: '/SuperAdmin/BusinessRequests' },
  { id: 'DatabaseRequest', name: 'Database Requests', icon: Database, path: '/SuperAdmin/DataBaseReq' },
  { id: 'CampusBuddy', name: 'Campus Buddy ', icon: Users, path: '/SuperAdmin/CampusBuddy' },
  { id: 'SheCanCode', name: 'She Can Code', icon: Sparkles, path: '/SuperAdmin/SheCanCode' },
  { id: 'skills', name: 'Manage Skills', icon: Award, path: '/SuperAdmin/skills' },
  { id: 'courses', name: 'Manage Courses', icon: BookOpen, path: '/SuperAdmin/courses' },
  // { id: 'keywords', name: 'Manage Keywords', icon: Tags, path: '/SuperAdmin/keywords' },
  // { id: 'institutes', name: 'Manage Institutes', icon: Building2, path: '/SuperAdmin/institutes' },
  { id: 'departments', name: 'Manage Departments', icon: Network, path: '/SuperAdmin/department' },
  { id: 'industries', name: 'Manage Industries', icon: Factory, path: '/SuperAdmin/industry' },
  { id: 'companies', name: 'Manage Companies', icon: Building2, path: '/SuperAdmin/company' },
  // { id: 'candidates', name: 'Search Candidates', icon: Search, path: '/SuperAdmin/candidates' },
  { id: 'designation', name: 'Manage Designation', icon: Network, path: '/SuperAdmin/Designation' },
  { id: 'deletedUsers', name: 'Manage Deleted Users', icon: UserX, path: '/SuperAdmin/DeletedUser' },
  { id: 'deletedAdmins', name: 'Manage Deleted Admins', icon: XCircle, path: '/SuperAdmin/DeletedAdmin' },
];

const SuperAdminSidebar = ({ activeModule, setActiveModule }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-screen bg-gray-900 text-white flex flex-col shadow-xl transition-all duration-300 z-40
          ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-64 md:translate-x-0'}
          md:min-w-[16rem] max-w-[20rem] overflow-hidden`}
      >
        {/* Header with Logo */}
        <div className="py-0 border-b bg-white border-gray-800 flex items-center justify-between">
         <div className="flex items-center space-x-2">
  <div className="w-full h-16 rounded-full overflow-hidden">
    <img src="assets/images/logo/Xhirez-Logo.png" alt="Logo" className="w-full hidden h-full object-cover" />
  </div>
 </div>

          <button className="md:hidden z-50 p-2" onClick={toggleSidebar}>
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.id}
                to={module.path}
                className={`flex items-center p-4 mx-2 my-1 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeModule === module.id ? 'bg-primary text-white shadow-sm' : 'text-gray-200 hover:bg-gray-800 hover:text-primary'}`}
                onClick={() => {
                  setActiveModule(module.id);
                  setIsOpen(false); // Close sidebar on mobile after click
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{module.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-400">
          © 2025 Xhirez Job Portal
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SuperAdminSidebar;