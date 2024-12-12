// import { useState, useEffect } from "react";
// import FeesForm from "../component/FeesForms";
// import axios from "axios";

// const FeesManagement = () => {
//   const [fees, setFees] = useState([]);
//   const [selectedFee, setSelectedFee] = useState(null);
//   const [formMode, setFormMode] = useState("add"); // "add" or "edit"
//   const [showForm, setShowForm] = useState(false);

//   // Fetch fees data
//   const fetchFees = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/fee/");
//       setFees(response.data);
//     } catch (error) {
//       console.error("Error fetching fees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFees();
//   }, []);

//   // Handle form submission
//   const handleFormSubmit = async (formData) => {
//     try {
//       if (formMode === "add") {
//         await axios.post("http://localhost:3000/fee/", formData);
//       } else if (formMode === "edit") {
//         await axios.put(`http://localhost:3000/fee/${formData._id}`, formData);
//       }
//       fetchFees(); // Refresh the list
//       setSelectedFee(null);
//       setFormMode("add");
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   // Handle delete operation
//   const handleDelete = async (feeId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this fee?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:3000/fee/${feeId}`);
//         fetchFees();
//       } catch (error) {
//         console.error("Error deleting fee:", error);
//       }
//     }
//   };

//   // Handle edit action
//   const handleEdit = (fee) => {
//     setSelectedFee(fee);
//     setFormMode("edit");
//     setShowForm(true);
//   };

//   // Toggle form visibility
//   const toggleForm = () => {
//     setShowForm(!showForm);
//     if (showForm) {
//       setSelectedFee(null);
//       setFormMode("add");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button
//         onClick={toggleForm}
//         style={{
//           padding: "10px 20px",
//           marginBottom: "20px",
//           background: "#28a745",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         {showForm ? "Close Form" : "Add Fee"}
//       </button>

//       {showForm && (
//         <FeesForm
//           formMode={formMode}
//           selectedFee={selectedFee}
//           onSubmit={handleFormSubmit}
//         />
//       )}

//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginTop: "20px",
//         }}
//       >
//         <thead>
//           <tr style={{ background: "#f4f4f4", height: "60px" }}>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Student</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Payment Date</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {fees.map((fee) => (
//             <tr key={fee._id}>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.student?.name || "N/A"}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.amount}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.paymentDate?.substring(0, 10)}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.status}</td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 <button
//                   style={{
//                     padding: "5px 10px",
//                     marginRight: "5px",
//                     background: "#007bff",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleEdit(fee)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   style={{
//                     padding: "5px 10px",
//                     background: "#dc3545",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleDelete(fee._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeesManagement;


import { useState, useEffect } from "react";
import FeesForm from "../component/FeesForms";
import axios from "axios";

const FeesManagement = () => {
  const [fees, setFees] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [formMode, setFormMode] = useState("add"); // "add" or "edit"
  const [showForm, setShowForm] = useState(false);

  // Fetch fees data
  const fetchFees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/fee/");
      setFees(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === "add") {
        await axios.post("http://localhost:3000/fee/", formData);
      } else if (formMode === "edit") {
        await axios.put(`http://localhost:3000/fee/${formData._id}`, formData);
      }
      fetchFees(); // Refresh the list
      setSelectedFee(null);
      setFormMode("add");
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (feeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this fee?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/fees/${feeId}`);
        fetchFees();
      } catch (error) {
        console.error("Error deleting fee:", error);
      }
    }
  };

  // Handle edit action
  const handleEdit = (fee) => {
    setSelectedFee(fee);
    setFormMode("edit");
    setShowForm(true);
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setSelectedFee(null);
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
        {showForm ? "Close Form" : "Add Fee"}
      </button>

      {showForm && (
        <FeesForm
          formMode={formMode}
          selectedFee={selectedFee}
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
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Amount</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Payment Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.student?.name || "N/A"}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.paymentDate?.substring(0, 10)}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{fee.status}</td>
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
                  onClick={() => handleEdit(fee)}
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
                  onClick={() => handleDelete(fee._id)}
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

export default FeesManagement;
