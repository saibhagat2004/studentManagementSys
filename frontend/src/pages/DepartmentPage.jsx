import { useState, useEffect } from "react";
import DepartmentForm from "../component/DepartmentForm";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showForm, setShowForm] = useState(false); // Form visibility toggle

  // Fetch departments data
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department/");
      setDepartments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/department/", formData);
        fetchDepartments(); // Refresh the list
      } else if (formMode === "edit") {
        await axios.put(`http://localhost:3000/department/${formData._id}`, formData);
        fetchDepartments(); // Refresh the list
      }
      setSelectedDepartment(null);
      setFormMode("add");
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (departmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/department/${departmentId}`);
        fetchDepartments(); // Refresh the list
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department. Please try again.");
      }
    }
  };

  // Handle edit action
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setFormMode("edit");
    setShowForm(true); // Show form when editing
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSelectedDepartment(null); // Reset selected department
      setFormMode("add");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={toggleForm}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Close Form" : "Add Department"}
      </button>

      {showForm && (
        <DepartmentForm
          formMode={formMode}
          selectedDepartment={selectedDepartment}
          onSubmit={handleFormSubmit}
        />
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f4f4f4", height: "60px" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Head</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Courses</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{department.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {department.head?.name || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                  {department.courses?.map((course, index) => (
                    <li key={index}>{course.name || "N/A"}</li>
                  ))}
                </ul>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    marginRight: "5px",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(department)}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: "5px 10px",
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(department._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentManagement;
