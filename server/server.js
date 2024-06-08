const express = require("express");
const dotenv = require("dotenv");
const DB_connection = require("./database/dbConnection.js");
const apiRoutes = require("./src/routes/api.js");
const ErrorHandlingMiddleware = require("./src/middleware/ErrorHandlingMiddleware.js");
const ApiError = require("./src/utils/AppError.js");
const userRoutes = require("./src/routes/userRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
const app = express();
const port = 8000;
app.use(express.json());
DB_connection();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(bodyParser.text({ type: "/" }));
app.use(cors(corsOptions));

app.use("/api", apiRoutes);
app.use("/api/user", userRoutes);

app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route ${req.originalUrl}`, 400));
});

// Global Error handling Middleware
app.use(ErrorHandlingMiddleware);
app.listen(port, () => console.log(`App listening on port ${port}!`));
