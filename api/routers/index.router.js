import { app } from "../../init.js";
import { authMiddleware } from "../middlewares/authorization.js";

import "./admin.router.js"

app.use(authMiddleware);
import "./user.router.js"
