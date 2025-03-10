const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./src/collections/User");
require("./src/collections/Workout");
require("./src/collections/Movement");
require("./src/collections/LoggedWorkout");

require("dotenv").config();

const userRouter = require("./src/routes/user");
const movementsRouter = require("./src/routes/movements");
const workoutsRouter = require("./src/routes/workouts");
const loggedWorkoutsRouter = require("./src/routes/loggedWorkouts");
const friendsRouter = require("./src/routes/friends");
const goalsRouter = require("./src/routes/userGoals");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use(goalsRouter);
app.use(userRouter);
app.use(movementsRouter);
app.use(workoutsRouter);
app.use(loggedWorkoutsRouter);
app.use(friendsRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log("Running on PORT ", PORT);
});
