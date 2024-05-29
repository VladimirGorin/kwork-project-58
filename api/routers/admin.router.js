import { verifyAuth, getUsers, updateUsers} from "../controllers/admin.controller.js";
import { app } from "../../init.js";

app.post("/admin-verify-auth", verifyAuth);
app.get("/get-users", getUsers);
app.post("/update-users", updateUsers);
