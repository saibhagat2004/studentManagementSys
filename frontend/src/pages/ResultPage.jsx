import { useState, useEffect } from "react";
import ResultForm from "../component/ResultForm";
import axios from "axios";

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [showForm, setShowForm] = useState(false);

  // Fetch results
  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:3000/result");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/result", formData);
      } else {
        await axios.put(`http://localhost:3000/result/${formData._id}`, formData);
      }
      fetchResults();
      setSelectedResult(null);
      setFormMode("add");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (resultId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this result?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/result/${resultId}`);
        fetchResults();
      } catch (error) {
        console.error("Error deleting result:", error);
        alert("Failed to delete result. Please try again.");
      }
    }
  };

  const handleEdit = (result) => {
    setSelectedResult(result);
    setFormMode("edit");
    setShowForm(true);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSelectedResult(null);
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
        {showForm ? "Close Form" : "Add Result"}
      </button>

      {showForm && (
        <ResultForm
          formMode={formMode}
          selectedResult={selectedResult}
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Student</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Course</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Marks</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Grade</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.student?.name || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.course?.name || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.marks}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.grade}</td>
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
                  onClick={() => handleEdit(result)}
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
                  onClick={() => handleDelete(result._id)}
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

export default ResultPage;
