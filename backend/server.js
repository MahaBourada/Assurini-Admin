import express from "express";
import cors from "cors";
import offersRoutes from "./routes/offers.js";
import companiesRoutes from "./routes/companies.js";
import usersRoutes from "./routes/users.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";

connectDB();

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/offers", offersRoutes);
app.use("/companies", companiesRoutes);

mongoose.connection.once('open', () => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port: http://localhost:${process.env.PORT}`)
  );
})
