import {Express} from 'express';
import {userHttpHandler} from "./user/user";
import {config} from "@domain/domain";
import {UserUsecase} from "@usecases/user/user";


export function setupRouter(app: Express, config: config): any {
    let userUsecase = new UserUsecase(config.userRepository);
    new userHttpHandler(app, config.userRepository, userUsecase);

    return app;
}