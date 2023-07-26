import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "@src/config";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  // @ts-ignore
  return connection.connection.db;
};
