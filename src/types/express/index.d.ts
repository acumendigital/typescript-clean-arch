import { Document, Model } from "mongoose";

declare global {
  namespace Express {}

  namespace Models {
    export type UserModel = Model<Document>;
    export type AdminModel = Model<Document>;
    export type WalletModel = Model<Document>;
  }
}
