import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./database-configuration/connect.js";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./logger/logger.js";

//config
dotenv.config();

// db connect
connect();

// init express
const app = express();
const port = process.env.PORT;

// middlewares
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

// error Handler
app.use(errorHandler);

// listen
app.listen(port, () => {
  logger.info("Server started on port http://localhost:" + port);
});

// unhandledRejection
process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
