/* eslint-disable react/prop-types */
// import React, { useState, useEffect } from "react";

// const StudentForm = ({ onSubmit }) => {
//   const [formVisible, setFormVisible] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     PID: "",
//     department: ""
//   });

//   // Fetch departments from the API
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/department/"); // Adjust API endpoint as needed
//         if (!response.ok) {
//           throw new Error("Failed to fetch departments");
//         }
//         const data = await response.json();
//         console.log(data);
//         setDepartments(data);
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   // Toggle form visibility
//   const toggleForm = () => setFormVisible(!formVisible);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.PID || !formData.department) {
//       alert("Name, PID, and Department are required.");
//       return;
//     }
//     onSubmit(formData); // Pass data to parent or perform API call
//     setFormData({
//       name: "",
//       PID: "",
//       department: "",
//       assignedTeacher: "",
//     });
//     setFormVisible(false); // Hide form after submission
//   };

//   return (
//     <div style={{ textAlign: "center" }}>
//       {/* Button to toggle form */}
//       <button
//         onClick={toggleForm}
//         style={{
//           padding: "10px 20px",
//           background: "#007bff",
//           color: "#fff",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           marginBottom:"18px"
//         }}
//       >
//         {formVisible ? "Cancel" : "Add Student"}
//       </button>

//       {/* Form (conditionally rendered) */}
//       {formVisible && (
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             margin: "50px auto",
//             padding: "20px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             maxWidth: "400px",
//             background: "#f9f9f9",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             textAlign: "left",
//           }}
//         >
//           <h3 style={{ textAlign: "center" }}>Add New Student</h3>

//           <div style={{ marginBottom: "10px" }}>
//             <label>
//               <strong>Name:</strong>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter name"
//                 required
//                 style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
//               />
//             </label>
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>
//               <strong>PID:</strong>
//               <input
//                 type="text"
//                 name="PID"
//                 value={formData.PID}
//                 onChange={handleChange}
//                 placeholder="Enter PID (e.g., EU12345)"
//                 required
//                 style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
//               />
//             </label>
//           </div>

//           <div style={{ marginBottom: "10px" }}>
//             <label>
//               <strong>Department:</strong>
//               <select
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   marginLeft: "10px",
//                   padding: "5px",
//                   width: "100%",
//                   height: "35px",
//                 }}
//               >
//                 <option value="" disabled>
//                   Select a department
//                 </option>
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept._id}>
//                     {dept.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           {/* <div style={{ marginBottom: "10px" }}>
//             <label>
//               <strong>Assigned Teacher:</strong>
//               <input
//                 type="text"
//                 name="assignedTeacher"
//                 value={formData.assignedTeacher}
//                 onChange={handleChange}
//                 placeholder="Enter Teacher ID"
//                 style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
//               />
//             </label>
//           </div> */}

//           <button
//             type="submit"
//             style={{
//               padding: "10px 20px",
//               background: "#28a745",
//               color: "#fff",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Submit
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default StudentForm;



import { useState, useEffect } from "react";

const StudentForm = ({ formMode, selectedStudent, onSubmit }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    PID: "",
    department: "",
  });

  // Prefill the form if in edit mode
  useEffect(() => {
    if (formMode === "edit" && selectedStudent) {
      setFormData({
        ...selectedStudent,
        department: selectedStudent.department?._id || "",
      });
    }
  }, [formMode, selectedStudent]);

  // Fetch departments
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
    fetchDepartments();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      department: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        background: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        {formMode === "edit" ? "Edit Student" : "Add New Student"}
      </h3>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Name:</strong>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <strong>Department:</strong>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{
              marginLeft: "10px",
              padding: "5px",
              width: "100%",
              height: "35px",
            }}
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {formMode === "edit" ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default StudentForm;
