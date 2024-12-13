
// SubjectManagement.js
import { useState, useEffect } from "react";
import axios from "axios";
import SubjectForm from "../component/SubjectForm";

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showForm, setShowForm] = useState(false);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/subject/");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/subject/", formData);
      } else if (formMode === "edit") {
        await axios.put(`http://localhost:3000/subject/${formData._id}`, formData);
      }
      fetchSubjects();
      setShowForm(false);
      setSelectedSubject(null);
      setFormMode("add");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (subjectId) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await axios.delete(`http://localhost:3000/subject/${subjectId}`);
        fetchSubjects();
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setFormMode("edit");
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setSelectedSubject(null);
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
        {showForm ? "Close Form" : "Add Subject"}
      </button>

      {showForm && (
        <SubjectForm
          formMode={formMode}
          selectedSubject={selectedSubject}
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Code</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Department</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Teacher</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{subject.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{subject.code}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {subject.department?.name || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {subject.teacher?.name || "N/A"}
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
                  onClick={() => handleEdit(subject)}
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
                  onClick={() => handleDelete(subject._id)}
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

export default SubjectManagement;
