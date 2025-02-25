const mongoose = require('mongoose');

const kanbanBoardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
  },
  { timestamps: true } // Auto-adds `createdAt` and `updatedAt`
);



module.exports = mongoose.model('KanbanBoard', kanbanBoardSchema);
