import Base from "@src/databases/repository/base";
import User from "@src/databases/mongoDb/models/wallet";

export class WalletRepo extends Base {
	constructor() {
		super(User);
	}

	// TODO: Add IWallet interface for data
	async create(data) {
		data = this.processData(data, []);
		return await this.baseCreate(data);
	}

	async update(query, data) {
		return this.baseUpdate(query, data);
	}
}

export default new WalletRepo();
