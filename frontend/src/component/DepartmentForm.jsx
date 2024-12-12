/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const DepartmentForm = ({ formMode, selectedDepartment, onSubmit }) => {
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  // Fetch teachers and courses when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/teacher/"); // Update the endpoint as per your API
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/subject/"); // Update the endpoint as per your API
        const data = await response.json();
        setAvailableCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchTeachers();
    fetchCourses();
  }, []);

  // Populate form fields in edit mode
  useEffect(() => {
    if (formMode === "edit" && selectedDepartment) {
      setName(selectedDepartment.name || "");
      setHead(selectedDepartment.head?._id || "");
      setCourses(selectedDepartment.courses?.map((course) => course._id) || []);
    } else {
      setName("");
      setHead("");
      setCourses([]);
    }
  }, [formMode, selectedDepartment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ _id: selectedDepartment?._id, name, head, courses });
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "#f9f9f9",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {formMode === "add" ? "Add Department" : "Update Department"}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Department Name:
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
            Head:
          </label>
          <select
            value={head}
            onChange={(e) => setHead(e.target.value)}
            required
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="" disabled>
              Select a Head (Teacher)
            </option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Courses:
          </label>
          <select
            multiple
            value={courses}
            onChange={(e) =>
              setCourses(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            style={{
              padding: "10px",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
              height: "90px",
            }}
          >
            {availableCourses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
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
          {formMode === "add" ? "Add Department" : "Update Department"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
