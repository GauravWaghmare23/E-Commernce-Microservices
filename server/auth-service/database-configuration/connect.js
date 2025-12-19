import mongoose from "mongoose";
import logger from "../logger/logger";

export async function connect() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);

    logger.info("Connected to database", {
      dbName: connection.connection.db.databaseName,
    });
  } catch (error) {
    logger.error("Error connecting to database", {
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
}
