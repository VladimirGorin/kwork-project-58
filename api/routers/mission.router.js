import { setUserCompletedMission, updateMission,deleteMission, getAllMissions, getMissions, addMission} from "../controllers/mission.controller.js"

import { app } from "../../init.js";

app.post("/get-missions", getMissions);

app.get("/get-all-missions", getAllMissions);

app.post("/add-mission", addMission);
app.post("/set-user-completed-mission", setUserCompletedMission);

app.post("/update-mission", updateMission);
app.post("/delete-mission", deleteMission);
