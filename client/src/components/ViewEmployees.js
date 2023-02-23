import React, { useEffect, useState } from "react";
import "../styles/ViewEmployees.css";

function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    fetch("/employees").then((resp) => {
      if (resp?.ok) {
        resp.json().then((employees) => setEmployees(employees));
      } else {
        resp.json().then((errorData) => setErrors(errorData.errors));
      }
    });
  }, []);
  return (
    <div>
        <div><h1>People: </h1></div>
      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="employee-card-header">
              <h2>
                {employee.first_name} {employee.last_name}
              </h2>
              <h4>{employee.email}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewEmployees;
