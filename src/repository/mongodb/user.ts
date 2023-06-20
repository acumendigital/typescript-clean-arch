import {userRepository, User} from '@domain/user';
import {Db} from "mongodb";


export class mongodbUserRepository implements userRepository {
    db: Db;
    constructor(db: Db) {
        this.db = db;
    }
    echo(user: User): User {
        return user;
    }
}