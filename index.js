require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000; // Use the PORT environment variable if available

const mongoose = require("mongoose"); // Import the mongoose module

const studentRoute = require("./routes/studentRoute");
const userRoute = require("./routes/userRoute");
const { authenticateToken } = require("./middlewares/authenticateToken");
// app.use(authenticateToken);

app.get("/", (req, res) => {
  res.send("API!");
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Handle JSON parsing error caused by invalid JSON data
    return res
      .status(400)
      .json({ message: "Invalid JSON data in the request body." });
  }

  // For other types of errors, you can define additional error handling logic
  // For example, you can return a 500 error for server-side errors

  return next(err); // If the error is not handled here, pass it to the next error handler
});

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/v1/students", studentRoute);

app.use("/api/v1/users", userRoute);
