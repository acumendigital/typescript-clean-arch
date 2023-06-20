import {Db, MongoClient} from "mongodb";
import {mongodbUserRepository} from "./user";

export async function setupMongo(): Promise<{ userRepository: mongodbUserRepository }> {
    const client: MongoClient = new MongoClient(process.env.MONGO_DB_URL || "")
    await client.connect()
    const db = client.db(process.env.MONGO_DB_NAME || "");

    return {
        userRepository: new mongodbUserRepository(db)
    };
}