import { Sequelize } from "sequelize"
import { config } from "dotenv"

import databaseConfig from "./config/config.json" with { type: "json" };

config({ path: "./assets/.env" })

const databaseData = databaseConfig[process.env.MODE]

if (!databaseData){
    throw Error(`Incorrect database mode (${process.env.MODE})`)
}

const sequelize = new Sequelize(databaseData.database, databaseData.username, databaseData.password, {
    dialect: databaseData.dialect,
    host: databaseData.host,
    port: databaseData.port,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

async function connect() {
    try {

        await sequelize.authenticate()
        await sequelize.sync()

        console.log("Successfully connected to the database")
    } catch (error) {
        console.error(`Error while trying to connect to the database: ${error}`)
        throw error
    }
}

export { sequelize, connect }
