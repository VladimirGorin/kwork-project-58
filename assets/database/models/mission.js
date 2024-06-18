import { sequelize } from "../connect.js";
import { DataTypes } from "sequelize";

const MissionModel = sequelize.define("mission", {
    id: { type: DataTypes.BIGINT, primaryKey: true, unique: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false },
    points: { type: DataTypes.BIGINT, allowNull: false },
    completedUsers: { type: DataTypes.JSON, defaultValue: []},
});

export { MissionModel };
