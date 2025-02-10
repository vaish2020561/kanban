const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect('mongodb+srv://vaishnavibharti71:bsYMThZsquqMTqAk@kanban-board.rayeu.mongodb.net/kanbanBoard');
};

module.exports = connectDB;
