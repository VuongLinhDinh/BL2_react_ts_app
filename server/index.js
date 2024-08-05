import cors from "cors";
import express from "express";
import router from "./src/routes/index.js";
import connectdb from "./src/utils/connectDB.js";
import { errorCommon, errorNotFound } from "./src/utils/handleError.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectdb(process.env.DB_URI || "mongodb://localhost:27017/myshop");

app.use("/api", router);

app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

// Error handler
app.use(errorNotFound, errorCommon);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
