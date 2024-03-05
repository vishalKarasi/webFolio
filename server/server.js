import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();

// import routes
import authRoute from "./routes/auth.js";
import experienceRoute from "./routes/experience.js";
import expertiseRoute from "./routes/expertise.js";
import messageRoute from "./routes/message.js";
import projectRoute from "./routes/project.js";
import reviewRoute from "./routes/review.js";

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// const __dirname = import.meta.dirname;
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/auth", authRoute);
app.use("/experience", experienceRoute);
app.use("/expertise", expertiseRoute);
app.use("/message", messageRoute);
app.use("/project", projectRoute);
app.use("/review", reviewRoute);

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
