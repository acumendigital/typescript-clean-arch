import Base from "./base.js";
import User from "../models/user.js";

export class UserRepo extends Base {
  constructor() {
    super(User);
  }

  // TODO: Add IUser interface for data
  async create(data) {
    data = this.processData(data, []);
    return await this.baseCreate(data);
  }

  async update(query, data) {
    return this.baseUpdate(query, data);
  }
}

export default new UserRepo();
