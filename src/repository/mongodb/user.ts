import {IUser, userRepository} from '@domain/user';
import {model, Schema} from "mongoose";

const userSchema: Schema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

export const User = model<IUser>('User', userSchema);

export class mongodbUserRepository implements userRepository {

    echo(user: IUser): IUser {
        return user;
    }

    async create(user: IUser): Promise<IUser> {

        const usr = new User({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })

        await usr.save()

        return usr as IUser;
    }

   async getAll(): Promise<IUser[]> {
       return await User.find({}) as IUser[];
    }
}