import Wallet from "@src/models/wallet";

//get current wallet balance
export async function getWalletBalance(user_id, currency = "USD") {
	let walletBalance = await Wallet.aggregate([
		{
			$match: {
				currency: currency,
				user: user_id,
			},
		},
		{
			$group: {
				_id: null,
				total: {
					$sum: "$amount",
				},
			},
		},
	]);

	return walletBalance.length ? walletBalance[0].total : 0;
}
