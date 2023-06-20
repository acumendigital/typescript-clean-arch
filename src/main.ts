require('module-alias/register')
import express, { Express } from 'express';
import { setupRouter } from "@delivery/http/router"
import {setupMongo} from "@repository/mongodb/mongodb";
import dotenv from 'dotenv';
import bodyParser from "body-parser";

dotenv.config();

(async () => {
    const app: Express = express();
    const port = process.env.PORT || "5001";
    app.use(bodyParser.json())

    const repo = await setupMongo()

    let _app = setupRouter(app,{ userRepository:repo.userRepository })

    _app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})();
