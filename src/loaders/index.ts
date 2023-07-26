import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import * as Db from "../databases";
import Logger from "./logger";
//We have to import at least all the events once so they can be triggered

export default async ({ expressApp }) => {
  const mongoConnection = await Db.mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  /**
   * What is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userRepo = {
    name: "userRepo",
    // Notice the require syntax and the '.default'
    model: Db.User,
  };
  const adminRepo = {
    name: "adminRepo",
    model: Db.Admin,
  };
  const walletRepo = {
    name: "walletRepo",
    model: Db.Wallet,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [userRepo, adminRepo, walletRepo],
  });
  Logger.info("✌️ Dependency Injector loaded");

  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
