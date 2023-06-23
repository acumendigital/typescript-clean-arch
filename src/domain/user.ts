export interface IUser {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string
}

export interface userRepository {
    echo(user: IUser): IUser;
    create(user: IUser): Promise<IUser>;
    getAll(): Promise<IUser[]>;
}

export interface userUsecase {
    echo(user: IUser): IUser;
    create(user: IUser): Promise<IUser>;
    getAll(): Promise<IUser[]>;
}