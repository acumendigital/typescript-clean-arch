import {Router} from 'express';
import {userHttpHandler} from "./user/user";
import {config} from "@domain/domain";
import {UserUsecase} from "@usecases/user/user";


export function setupRouter(config: config): any {
    const app: Router = Router();

    let userUsecase = new UserUsecase(config.userRepository);
    new userHttpHandler(app, config.userRepository, userUsecase);

    return app;
}