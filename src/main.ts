require('module-alias/register')
import express, { Express } from 'express';
import { setupRouter } from "@delivery/http/router"
import {mongoRepository} from "@repository/mongodb/mongodb";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {initLogger} from "@pkg/logger/logger";

dotenv.config();

(async () => {
    const app: Express = express();
    const port = process.env.PORT || "5001";
    app.use(bodyParser.json())

    const mongoRepo = new mongoRepository()

    const repo = await mongoRepo.setupMongo()

    const logger = initLogger() // probably want to pass this down the dependency tree

    let _app = setupRouter({ userRepository:repo.userRepository })

    app.use("/api/v1" as any, _app);

    app.listen(port, () => {

        logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
    });
})();

