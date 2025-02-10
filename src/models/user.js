const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    city: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
      },
      role: {
        type: String,
        enum: ["user", "admin"], // Add roles if needed
        default: "user",
      },
      boards: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Board", // Reference to Kanban boards
        },
      ],
});


module.exports = mongoose.model('User', userSchema);