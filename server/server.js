const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const DB_connection = require("./database/dbConnection.js");
const apiRoutes = require("./src/routes/api.js");
const ErrorHandlingMiddleware = require("./src/middleware/ErrorHandlingMiddleware.js");
const ApiError = require("./src/utils/AppError.js");
const userRoutes = require("./src/routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8000;

// Middleware to parse JSON
app.use(express.json());

// Database connection
DB_connection();

// CORS options
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.text({ type: "/" }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use("/api", apiRoutes);
app.use("/api/user", userRoutes);

// Catch-all route to serve the frontend's index.html for any route not handled by the above routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Handle undefined routes with a custom error
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Error handling Middleware
app.use(ErrorHandlingMiddleware);

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`));
