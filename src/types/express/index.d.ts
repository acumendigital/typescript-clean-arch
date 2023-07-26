import { Document, Model } from "mongoose";

declare global {
	namespace Express {}

	namespace Models {
		export type User = Model<Document>;
		export type Admin = Model<Document>;
		export type Wallet = Model<Document>;
	}

	namespace Repositories {}
}
