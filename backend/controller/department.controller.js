const Department = require('../models/department.model.js');


const getAllDepartments = async (req, res) => {
    try {
      const departments = await Department.find()
        .populate('head', 'name employeeId') // Populate head with specific fields
        .populate('courses', 'name code'); // Populate courses with specific fields
  
      return res.status(200).json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  


// Controller to create a new department
const createDepartment = async (req, res) => {
    try {
      const { name, head, courses } = req.body;
  
      // Validate required fields
      if (!name) {
        return res.status(400).json({ error: "Department name is required" });
      }
  
      // Create the department object
      const newDepartment = new Department({
        name,
        head: head || null, // Set head to provided ObjectId or null
        courses: courses || [], // Set courses to provided array or an empty array
      });
  
      // Save the department to the database
      const savedDepartment = await newDepartment.save();
  
      return res.status(201).json({
        message: "Department created successfully",
        department: savedDepartment,
      });
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const updateDepartment = async (req, res) => {
    try {
      const { id } = req.params; // Department ID from URL params
      const { head, courses } = req.body;
  
      // Find and update the department
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        {
          ...(head && { head }), // Update head if provided
          ...(courses && { courses }), // Update courses if provided
        },
        { new: true, runValidators: true } // Return updated document and run schema validations
      );
  
      if (!updatedDepartment) {
        return res.status(404).json({ error: "Department not found" });
      }
  
      return res.status(200).json({
        message: "Department updated successfully",
        department: updatedDepartment,
      });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const deleteDepartment = async (req, res) => {
    try {
      const { id } = req.params; // Get the department ID from URL params
  
      // Find and delete the department
      const deletedDepartment = await Department.findByIdAndDelete(id);
  
      if (!deletedDepartment) {
        return res.status(404).json({ error: "Department not found" });
      }
  
      return res.status(200).json({
        message: "Department deleted successfully",
        department: deletedDepartment, // Return the deleted department's data
      });
    } catch (error) {
      console.error("Error deleting department:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  module.exports = { 
    createDepartment,
    updateDepartment,
    getAllDepartments,
    deleteDepartment
  };
  

