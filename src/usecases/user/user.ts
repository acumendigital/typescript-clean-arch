import {userUsecase, User, userRepository} from "@domain/user";

export class UserUsecase implements userUsecase {
    repo: userRepository;

    constructor(repo: userRepository) {
        this.repo = repo
    }

    echo(user: User): User {
        return user;
    }
}