
import { useState, useEffect } from "react";
import StudentForm from "../component/StudentForm";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showForm, setShowForm] = useState(false); // Form visibility toggle

  // Fetch students data
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/student/");
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {  //to render and handle side effects
    fetchStudents();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/student/", formData);
        fetchStudents(); // Refresh the list
      } else if (formMode === "edit") {
        await axios.put(`http://localhost:3000/student/${formData._id}`, formData);
        fetchStudents(); // Refresh the list
      }
      setSelectedStudent(null);
      setFormMode("add");
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/student/${studentId}`);
        fetchStudents(); // Refresh the list
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Please try again.");
      }
    }
  };

  // Handle edit action
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setFormMode("edit");

    setShowForm(true); // Show form when editing
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSelectedStudent(null); // Reset selected student
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
        {showForm ? "Close Form" : "Add Student"}
      </button>

      {showForm && (
        <StudentForm
          formMode={formMode}
          selectedStudent={selectedStudent}
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
    <tr style={{ background: "#f4f4f4", height:"60px"  }}>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>PID</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Results</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Fees</th>
      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {students.map((student) => (
      <tr key={student._id}>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.name}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{student.PID || "N/A"}</td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
          {student.department?.name || "N/A"}
        </td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {student.results?.map((result, index) => (
              <li key={index}>
                {result.course?.name || "N/A"} - Marks: {result.marks || "N/A"}
              </li>
            ))}
          </ul>
        </td>
        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {student.fees?.map((fee, index) => (
              <li key={index}>
                Amount: {fee.amount} Rs - Status: {fee.status}
              </li>
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
            onClick={() => handleEdit(student)}
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
            onClick={() => handleDelete(student._id)}
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

export default StudentManagement;
