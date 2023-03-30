import React, { useEffect, useState } from "react";
import "../styles/ViewEmployees.css";
import EmployeeDetails from "./EmployeeDetails";
import SearchBar from "./SearchBar";

function ViewEmployees({ jobs }) {
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetch("/employees")
      .then((resp) => {
        if (resp?.ok) {
          resp.json().then((employees) => setEmployees(employees));
        } else {
          resp.json().then((errorData) => setErrors(errorData.errors));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleClick(employee) {
    setSelectedEmployee(employee);
  }

  function handleClose() {
    setSelectedEmployee(null);
  }

  return (
    <div>
      <div>
        <SearchBar employees={employees} setFilteredEmployees={setFilteredEmployees} />
        {filteredEmployees.map((employee) => (
          <div key={employee.id}>
            <p>
              {employee.first_name} {employee.last_name}
            </p>
          </div>
        ))}
      </div>
      <div className="employee-list">
        {filteredEmployees.length > 0
          ? filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="employee-card"
                onClick={() => handleClick(employee)}
              >
                <div className="employee-card-header">
                  <h2>
                    {employee.first_name} {employee.last_name}
                  </h2>
                  <h4>{employee.email}</h4>
                </div>
              </div>
            ))
          : employees.map((employee) => (
              <div
                key={employee.id}
                className="employee-card"
                onClick={() => handleClick(employee)}
              >
                <div className="employee-card-header">
                  <h2>
                    {employee.first_name} {employee.last_name}
                  </h2>
                  <h4>{employee.email}</h4>
                </div>
              </div>
            ))}
      </div>
      {selectedEmployee && (
        <div className="dropdown">
          <EmployeeDetails employee={selectedEmployee} onClose={handleClose} jobs={jobs} />
        </div>
      )}
    </div>
  );
}

export default ViewEmployees;
