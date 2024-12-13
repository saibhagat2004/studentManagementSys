
// TeacherManagement.js
import { useState, useEffect } from "react";
import TeacherForm from "../component/TeacherForm";
import axios from "axios";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showForm, setShowForm] = useState(false);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/teacher/");
      setTeachers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/teacher/", formData);
      } else if (formMode === "edit") {
        await axios.put(
          `http://localhost:3000/teacher/${formData._id}`,
          formData
        );
      }
      fetchTeachers();
      setSelectedTeacher(null);
      setFormMode("add");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/teacher/${teacherId}`);
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormMode("edit");
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSelectedTeacher(null);
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
        {showForm ? "Close Form" : "Add Teacher"}
      </button>

      {showForm && (
        <TeacherForm
          formMode={formMode}
          selectedTeacher={selectedTeacher}
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Employee ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Subjects</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{teacher.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{teacher.employeeId}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {teacher.department?.name || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {teacher.subjects?.map((subject) => (
                    <li key={subject._id}>{subject.name}</li>
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
                  onClick={() => handleEdit(teacher)}
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
                  onClick={() => handleDelete(teacher._id)}
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

export default TeacherManagement;
