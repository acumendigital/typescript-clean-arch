import { Router } from "express";
import admin from "@src/api/http/routes/admin/admin";
import adminAuth from "@src/api/http/routes/admin/auth";
import agendash from "@src/api/http/routes/agendash";

// guaranteed to get dependencies
export default () => {
	const app = Router();

	agendash(app);

	//admin
	admin(app);
	adminAuth(app);

	return app;
};
