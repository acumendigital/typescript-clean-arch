import {IUser, userRepository, userUsecase} from "@domain/user";

export class UserUsecase implements userUsecase {
    repo: userRepository;

    constructor(repo: userRepository) {
        this.repo = repo
    }

    echo(user: IUser): IUser {
        return this.repo.echo(user);
    }

    async create(user: IUser): Promise<IUser> {
        return await this.repo.create(user);
    }

    async getAll(): Promise<IUser[]> {
        return await this.repo.getAll();
    }
}