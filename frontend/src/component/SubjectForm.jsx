// SubjectForm.js
import { useState, useEffect } from "react";

const SubjectForm = ({ formMode, selectedSubject, onSubmit }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);

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

    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/teacher/");
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchDepartments();
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (formMode === "edit" && selectedSubject) {
      setName(selectedSubject.name || "");
      setCode(selectedSubject.code || "");
      setDepartment(selectedSubject.department || "");
      setTeacher(selectedSubject.teacher || "");
    } else {
      setName("");
      setCode("");
      setDepartment("");
      setTeacher("");
    }
  }, [formMode, selectedSubject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ _id: selectedSubject?._id, name, code, department, teacher });
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
          {formMode === "add" ? "Add Subject" : "Update Subject"}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Subject Name:
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
            Subject Code:
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Teacher:
          </label>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Select a Teacher
            </option>
            {teachers.map((tch) => (
              <option key={tch._id} value={tch._id}>
                {tch.name}
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
          {formMode === "add" ? "Add Subject" : "Update Subject"}
        </button>
      </form>
    </div>
  );
};

export default SubjectForm;