import { Router } from "express";
import { getBalance, setBalance } from "../controllers/user.controller.js";
import { app } from "../../init.js";
import { authMiddleware } from "../middlewares/authorization.js";


app.use(authMiddleware)
app.post("/user-get-balance", getBalance)
app.post("/user-set-balance", setBalance)
