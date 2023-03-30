import React, { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ employees, setFilteredEmployees }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterEmployees(event.target.value);
  };

  const filterEmployees = (query) => {
    const filtered = employees.filter(
      (employee) =>
        employee.first_name.toLowerCase().includes(query.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for an employee"
        className="search-bar-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
