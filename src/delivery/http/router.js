"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouter = void 0;
const user_1 = require("./user/user");
const user_2 = require("@usecases/user/user");
function setupRouter(app, config) {
    let userUsecase = new user_2.UserUsecase(config.userRepository);
    new user_1.userHttpHandler(app, config.userRepository, userUsecase);
    return app;
}
exports.setupRouter = setupRouter;
