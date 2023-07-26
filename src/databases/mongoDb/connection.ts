import mongoose from "mongoose";
import config from "@src/config";
import logger from "@src/loaders/logger";

const mongoConnection = async () => {
  let count = 0;

  while (true) {
    try {
      const connection = await mongoose.connect(config.databaseURL, {});
      return connection.connection.db;
    } catch (e) {
      logger.error("database connection error, retrying...", e);
      count += 1;
      if (count > 5) {
        logger.error("database connection error, not retrying", e);
        throw e;
      }

      const backOff = Math.pow(2, count);
      await new Promise((resolve) => setTimeout(resolve, backOff * 1000));
      logger.debug("backing off for " + backOff + " seconds");
    }
  }
};

export default mongoConnection;
