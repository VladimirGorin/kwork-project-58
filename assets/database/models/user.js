import { sequelize } from "../connect.js"
import { DataTypes } from "sequelize"

const UserModel = sequelize.define("user", {
    id: { type: DataTypes.BIGINT, primaryKey: true, unique: true, autoIncrement: true },
    chatId: { type: DataTypes.BIGINT, unique: true },
    username: { type: DataTypes.STRING },
    isSubscribe: {type: DataTypes.BOOLEAN, defaultValue: false},
    startDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    refCoins: { type: DataTypes.INTEGER, defaultValue: 0 },
    refNum: { type: DataTypes.INTEGER, defaultValue: 0 },
    gameCoins: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export { UserModel }
