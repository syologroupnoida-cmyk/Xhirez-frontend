import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { API_ENDPOINTS } from "../apiConfig";

const SkillsMultiselect = ({ formData = { skills: [] }, handleMultiselectChange }) => {
  const [skillsOptions, setSkillsOptions] = useState([]);

  
  useEffect(() => {
    axios.get(API_ENDPOINTS.FETCH_SKILLS)
      .then((res) => {
        console.log("Skills API Response:", res.data); 
       
        const fetchedSkills = res.data.data.map((item) => item.Skills.trim()); 
        setSkillsOptions(fetchedSkills);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <Multiselect
      className="mt-1 w-full sm:w-3/4 lg:w-1/2 max-w-[600px] py bg-white min-h-[45px] border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
      options={skillsOptions} 
      selectedValues={formData?.skills || []} 
      onSelect={(selectedList, selectedItem) =>
        handleMultiselectChange(selectedList, selectedItem, "skills")
      }
      onRemove={(selectedList, removedItem) =>
        handleMultiselectChange(selectedList, removedItem, "skills")
      }
      displayValue="name"
      placeholder="Select skills"
      isObject={false}
    />
  );
};

export default SkillsMultiselect;
