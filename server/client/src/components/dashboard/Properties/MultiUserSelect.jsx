import React, { useState } from "react";
import Select from "react-select";

// Dummy user data
const users = [
  { value: "user1", label: "User One" },
  { value: "user2", label: "User Two" },
  { value: "user3", label: "User Three" },
  { value: "user4", label: "User Four" },
];

const MultiUserSelect = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };

  const handleSubmit = () => {
    // Here you can send the selected users to your API
  };

  return (
    <div>
      <Select
        isMulti
        name="users"
        options={users}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiUserSelect;
