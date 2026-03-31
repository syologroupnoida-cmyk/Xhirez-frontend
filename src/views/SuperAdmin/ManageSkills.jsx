import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Code, RefreshCw, Filter } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '../apiConfig';
import { Toaster, toast } from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';
import AuthorizationHeader from '../AuthorizationHeader';


const SkillsManagement = () => {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'active' });

  const fetchSkills = () => {
    setIsLoading(true);
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINGETALLSKILLS)
      .then(response => {
        if(response.data.status === 200) {
          // Transform the API response into our expected format
          const transformedSkills = response.data.data.map((item, index) => ({
            id: index + 1,
            name: item.Skills.trim(),
            status: 'active'
          }));
          setSkills(transformedSkills);
        } else {
          toast.error(response.data.statusText || 'Failed to fetch skills');
        }
      })
      .catch(error => {
        console.error('Error fetching skills:', error);
        toast.error('Error fetching skills');
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  }

  useEffect(() => {
    fetchSkills();
  }, []);

  // Filter skills
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || skill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddSkill = () => {
    setEditingSkill(null);
    setFormData({ name: '', status: 'active' });
    setShowModal(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, status: skill.status });
    setShowModal(true);
  };

  const handleSaveSkill = () => {
  if (!formData.name.trim()) {
    toast.error('Skill name cannot be empty');
    return;
  }

  const skillData = {
    skill: formData.name.trim()
  };

  if (editingSkill) {
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMINUPDATESKILLS, {
     params:{
      ...skillData, 
      id: editingSkill.id
     }
    })
    .then(response => {
      if(response.data.status === 200) {
        toast.success(response.data.statusText || 'Skill updated successfully');
        setShowModal(false);
      } else {
        toast.error(response.data.statusText || 'Failed to update skill');
      }
    })
    .catch(error => {
      console.error('Error updating skill:', error);
      toast.error('Error updating skill');
    });
  } 
  else
   {
    // Add new skill - using get method
    AuthorizationHeader.get(API_ENDPOINTS.SUPERADMININSERTNEWSKILLS,{
      params:{
        skill: skillData.skill,
      }
    })
    .then(response => {
      if(response.data.status === 200) {
        toast.success(response.data.statusText || 'Skill added successfully');
        setShowModal(false);
      } else {
        toast.error(response.data.statusText || 'Failed to add skill');
      }
    })
    .catch(error => {
      console.error('Error adding skill:', error);
      toast.error('Error adding skill');
    });
  }
};

  const handleDeleteSkill = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      // Note: You might need to implement a delete API endpoint
      setSkills(prev => prev.filter(skill => skill.id !== id));
      toast.success('Skill deleted (local only - implement API)');
    }
  };

  const handleRefresh = () => {
    fetchSkills();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading skills...</p>
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
                  <h4 className="text-xl font-bold text-gray-900">Skills Management</h4>
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
                  onClick={handleAddSkill}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="col-lg-12 p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills List */}
        {filteredSkills.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? "Try adjusting your search or filter criteria" 
                : "Add your first skill to get started"}
            </p>
            <button
              onClick={searchTerm || statusFilter !== 'all' ? () => {
                setSearchTerm('');
                setStatusFilter('all');
              } : handleAddSkill}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {searchTerm || statusFilter !== 'all' ? 'Clear Filters' : 'Add Skill'}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {filteredSkills.map((skill, index) => (
              <div key={skill.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${index !== filteredSkills.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${skill.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {skill.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditSkill(skill)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  {/* <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button> */}
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
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React, Python"
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
                onClick={handleSaveSkill}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingSkill ? 'Update' : 'Save'} Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManagement;