import { Sequelize } from "sequelize"
import { config } from "dotenv"

config({ path: "./assets/.env" })

const sequelize = new Sequelize({
    dialect: 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    logging: false
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
