// TeacherForm.js

// TeacherForm.js
import { useState, useEffect } from "react";

const TeacherForm = ({ formMode, selectedTeacher, onSubmit }) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/department/");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/subject/");
        const data = await response.json();
        setAvailableSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchDepartments();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (formMode === "edit" && selectedTeacher) {
      setName(selectedTeacher.name || "");
      setEmployeeId(selectedTeacher.employeeId || "");
      setDepartment(selectedTeacher.department || "");
      setSubjects(selectedTeacher.subjects || []);
    } else {
      setName("");
      setEmployeeId("");
      setDepartment("");
      setSubjects([]);
    }
  }, [formMode, selectedTeacher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      _id: selectedTeacher?._id,
      name,
      employeeId,
      department,
      subjects,
    });
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {formMode === "add" ? "Add Teacher" : "Update Teacher"}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Employee ID:
          </label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Department:
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Select a Department
            </option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Subjects:
          </label>
          <select
            multiple
            value={subjects}
            onChange={(e) =>
              setSubjects(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              height: "100px",
            }}
          >
            {availableSubjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
          }}
        >
          {formMode === "add" ? "Add Teacher" : "Update Teacher"}
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;