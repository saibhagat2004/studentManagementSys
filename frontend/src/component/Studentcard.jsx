/* eslint-disable react/prop-types */


const StudentCard = ({ student, onEdit, onDelete }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      onDelete(student._id); // Pass the `student._id` back to the parent component
    }
  };

  return (
    <div
      className="student-card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "15px",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="student-details">
        <h2>{student.name}</h2>
        <p>PID: {student.PID}</p>
        <p>Department: {student.department?.name || "N/A"}</p>
        <p>Department Head: {student.department?.head?.name || "N/A"}</p>
        <p>Results: {student.results?.length || 0} record(s)</p>
        <p>Fees:</p>
        <ul>
          {student.fees?.map((fee, index) => (
            <li key={index}>
              Amount: {fee.amount} Rs - Status: {fee.status} - Payment Date:{" "}
              {new Date(fee.paymentDate).toLocaleDateString() || "N/A"}
            </li>
          ))}
        </ul>
      </div>

      <div className="student-actions" style={{ marginTop: "10px" }}>
        <button
          className="edit-btn"
          onClick={() => onEdit(student)}
          style={{
            padding: "10px 15px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={handleDelete}
          style={{
            padding: "10px 15px",
            background: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;

