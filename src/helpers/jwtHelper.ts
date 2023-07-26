import jwt from "jsonwebtoken";
import config from "@src/config";

export async function generateJwtToken(user: object) {
	const today = new Date();
	const exp = today.setDate(today.getDate() + 60);

	return jwt.sign(
		{
			_id: user["_id"], // We are gonna use this in the middleware 'isAuth'
			email: user["email"],
			first_name: user["first_name"],
			last_name: user["last_name"],
		},
		config.jwtSecret,
		{ expiresIn: exp },
	);
}

export const tokenVerifier = async (authToken: string) => {
	const decoded = jwt.verify(authToken, config.jwtSecret);

	return decoded;
};
