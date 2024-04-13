import { Sequelize } from "sequelize"
import { config } from "dotenv"

config({ path: "./assets/.env" })

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: true,
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
