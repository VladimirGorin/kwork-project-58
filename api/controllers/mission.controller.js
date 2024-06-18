import { MissionModel } from "../../assets/database/models/mission.js";
import { UserModel } from "../../assets/database/models/user.js";

export async function setUserCompletedMission(req, res) {
  try {
    const { userId, missionId, points } = req.body;

    if (userId, missionId, points === undefined) {
      throw Error("Data is incorrect");
    }

    const mission = await MissionModel.findOne({ where: { id: Number(missionId) } });
    const user = await UserModel.findOne({ where: { chatId: Number(userId) } })

    if (!user) {
      throw Error("User not found");
    }

    if (!mission) {
      throw Error("Mission not found");
    }

    const completedUsers = [...mission.completedUsers, Number(userId)]

    mission.completedUsers = completedUsers

    user.refCoins = Number(user.refCoins) + Number(points)

    await user.save()
    await mission.save();

    res.status(200).send({ "status": true });
  } catch (error) {
    res.status(400).send({ "status": false, "errorMessage": error.message });
    return;
  }
}

export async function addMission(req, res) {
  try {

    const { category, text, icon, link, points } = req.body

    if (category, text, icon, link, points === undefined) {
      throw Error("Data is incorrect")
    }

    const mission = await MissionModel.create(req.body)

    res.status(200).send({ "status": true, "mission": mission })
  } catch (error) {
    res.status(400).send({ "status": false, "errorMessage": error.message })
    return;
  }
}

export async function getMissions(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      throw Error("User not found");
    }

    const missions = await MissionModel.findAll();

    const response = {
      "completedMissions": [],
      "missions": []
    };

    missions.forEach(mission => {
      const task = {
        id: mission.id,
        text: mission.text,
        icon: mission.icon,
        link: mission.link,
        points: mission.points,
        completed: mission.completedUsers.includes(id)
      };

      if (mission.completedUsers.includes(id)) {
        const categoryIndex = response.completedMissions.findIndex(m => m.category === mission.category);
        if (categoryIndex > -1) {
          response.completedMissions[categoryIndex].tasks.push(task);
        } else {
          response.completedMissions.push({ category: mission.category, tasks: [task] });
        }
      } else {
        const categoryIndex = response.missions.findIndex(m => m.category === mission.category);
        if (categoryIndex > -1) {
          response.missions[categoryIndex].tasks.push(task);
        } else {
          response.missions.push({ category: mission.category, tasks: [task] });
        }
      }
    });

    res.status(200).send({ "status": true, "completedMissions": response.completedMissions, "missions": response.missions });
  } catch (error) {
    res.status(400).send({ "status": false, "errorMessage": error.message });
    return;
  }
}

export async function getAllMissions(req, res) {
  try {
    const missions = await MissionModel.findAll();

    res.status(200).send({ "status": true, "missions": missions });
  } catch (error) {
    res.status(400).send({ "status": false, "errorMessage": error.message });
    return;
  }
}

export async function updateMission(req, res) {
  try {

    const { id, category, text, icon, link, points, completedUsers } = req.body

    if (id, category, text, icon, link, points, completedUsers == undefined) {
      throw Error("Invalid data")
    }

    const mission = await MissionModel.findOne({ where: { id: Number(id) } });

    if (!mission) {
      throw Error("Mission not found")
    }


    mission.category = category
    mission.text = text
    mission.icon = icon
    mission.link = link
    mission.points = points

    await mission.save()

    res.status(200).send({ "status": true });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "status": false, "errorMessage": error.message });
    return;
  }
}

export async function deleteMission(req, res) {
  try {

    const { id } = req.body

    if (id == undefined) {
      throw Error("Invalid data")
    }

    const mission = await MissionModel.findOne({ where: { id: Number(id) } });

    if (!mission) {
      throw Error("Mission not found")
    }

    await mission.destroy()
    await mission.save()

    res.status(200).send({ "status": true });
  } catch (error) {
    console.log(error)
    res.status(400).send({ "status": false, "errorMessage": error.message });
    return;
  }
}
