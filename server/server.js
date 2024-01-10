import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();
dotenv.config();

// import routes
import authRoute from "./routes/auth.js";
import experienceRoute from "./routes/experience.js";
import expertiseRoute from "./routes/expertise.js";
import messageRoute from "./routes/message.js";
import projectRoute from "./routes/project.js";
import reviewRoute from "./routes/review.js";

// middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

// routes

app.use("/api/auth", authRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/expertise", expertiseRoute);
app.use("/api/message", messageRoute);
app.use("/api/project", projectRoute);
app.use("/api/review", reviewRoute);

app.use(errorHandler);

// server
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server runing on Port: ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log(error));
