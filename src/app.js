const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const KanbanBoard = require("./models/kanbanBoard");

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database before starting the server
connectDB()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

// POST API - Signup
app.post("/signup", async (req, res) => {
  // creating a instannce of the user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send(" user added in kanban ");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// GET API - Find user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.query.email || req.body.email; // Check both query and body

    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "Email is required in query or body" });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted sucessfully");
  } catch (err) {
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
});

app.patch("/user",async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try{
     await User.findByIdAndUpdate({_id : userId}, data);
     res.send("user updated successfully");
  }catch(err){
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
})
app.post("/kanban", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Validate request body  q
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and Description are required" });
    }

    const kanban = new KanbanBoard({
      title,
      description,
      status: status || "To Do",
      priority: priority || "Medium",
      dueDate: dueDate || null,
    });

    await kanban.save();
    res.status(201).json({ message: "Kanban task added successfully", kanban });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving the Kanban task: " + err.message });
  }
});

app.get("/kanban", async (req, res) => {
  try {
    const { title, status, priority } = req.query; // Get title from query parameters
    let filter = { status: "To Do" };

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    if (status) {
      filter.status = status; // Exact match for status
    }
    if (priority) {
      filter.priority = priority; // Exact match for priority
    }

    const tasks = await KanbanBoard.find(filter);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No matching tasks found" });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks: " + err.message });
  }
});
