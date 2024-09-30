import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import userRoute from "./src/routes/user.route.js";
import movieRoute from "./src/routes/movie.route.js"
import dbConnection from "./src/databaseConnection/connectDB.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Is Running On The PORT ${PORT}`);
  dbConnection();
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test Route
app.get("/test", (req, res) => {
  res.json("Test Success");
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/admin/movie", movieRoute)