import {mongodbUserRepository} from "./user";
import {mongodbRepository} from "@domain/domain";
import { connect } from 'mongoose';

export class mongoRepository {
    async setupMongo(): Promise<mongodbRepository> {
        await connect(process.env.MONGO_DB_URL || "")
        return {
            userRepository: new mongodbUserRepository()
        };
    }
}

