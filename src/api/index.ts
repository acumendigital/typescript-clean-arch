import { Router } from "express";
import admin from "./routes/admin/admin";
import adminAuth from "./routes/admin/auth";
import agendash from "./routes/agendash";

// guaranteed to get dependencies
export default () => {
	const app = Router();

	agendash(app);

	//admin
	admin(app);
	adminAuth(app);

	return app;
};
