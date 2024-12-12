/* eslint-disable react/prop-types */
import  { useState, useEffect } from "react";

const ResultForm = ({ formMode, selectedResult, onSubmit }) => {
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    marks: "",
    grade: "",
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch students and courses on mount
  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData("http://localhost:3000/student/", setStudents);
    fetchData("http://localhost:3000/subject/", setCourses);
  }, []);

  // Populate form fields in edit mode
  useEffect(() => {
    if (formMode === "edit" && selectedResult) {
      setFormData({
        student: selectedResult.student?._id || "",
        course: selectedResult.course?._id || "",
        marks: selectedResult.marks || "",
        grade: selectedResult.grade || "",
      });
    } else {
      setFormData({ student: "", course: "", marks: "", grade: "" });
    }
  }, [formMode, selectedResult]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: selectedResult?._id });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        background: "#f9f9f9",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {formMode === "add" ? "Add Result" : "Update Result"}
      </h2>
      <div style={{ marginBottom: "15px" }}>
        <label>Student:</label>
        <select name="student" value={formData.student} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Course:</label>
        <select name="course" value={formData.course} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Marks:</label>
        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          required
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label>Grade:</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />
      </div>
      <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff" }}>
        {formMode === "add" ? "Add Result" : "Update Result"}
      </button>
    </form>
  );
};

export default ResultForm;
