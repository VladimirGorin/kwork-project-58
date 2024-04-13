import { Router } from "express";
import { getBalance, setBalance } from "../controllers/user.controller.js";
import { app } from "../../init.js";

app.post("/user-get-balance", getBalance)
app.post("/user-set-balance", setBalance)
