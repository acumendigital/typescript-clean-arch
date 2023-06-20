export interface User {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string
}

export interface userRepository {
    echo(user: User): User;
}

export interface userUsecase {
    echo(user: User): User;
}