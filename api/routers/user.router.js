import { getBalance, setBalance, runFiends, runClaim } from "../controllers/user.controller.js"

import { app } from "../../init.js";

app.post("/user-get-balance", getBalance);
app.post("/user-set-balance", setBalance);
app.post("/user-friends", runFiends);
app.post("/user-claim", runClaim);
