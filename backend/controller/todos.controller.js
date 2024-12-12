


  



const Todo = require("../models/Todo.model.js"); // Adjust path as needed

// Controller to fetch all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("All To-Dos:", todos);
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Error fetching todos" });
  }
};

const addTodos=  async (req, res) => {
    try {
      const { task } = req.body; 
      if (!task) {
        return res.status(400).json({ message: 'Task is required' });
      }
      const newTodo = new Todo({ task });
      const savedTodo = await newTodo.save();
      console.log('New To-Do Created:', savedTodo);
      res.status(201).json(savedTodo);
    } catch (err) {
      console.error('Error creating to-do:', err);
      res.status(500).json({ message: 'Error creating to-do' });
    }
  }

const updateTodos=async (req, res) => {
  try {
    const { id } = req.params; 
    const { task, completed } = req.body; 7
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true, runValidators: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    console.log('To-Do Updated:', updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error('Error updating to-do:', err);
    return res.status(500).json({ message: 'Error updating to-do' });
  }
}



module.exports = {
  getAllTodos,
  addTodos,
  updateTodos
};









