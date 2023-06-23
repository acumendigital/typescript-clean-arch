"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUsecase = void 0;
class UserUsecase {
    constructor(repo) {
        this.repo = repo;
    }
    echo(user) {
        return user;
    }
}
exports.UserUsecase = UserUsecase;
