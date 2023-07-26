import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		amount: {
			type: Number, //parse as a negative value when deducting e.g // -200
		},
		currency: {
			type: String,
			default: "NGN",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<mongoose.Document>("Wallet", walletSchema);
