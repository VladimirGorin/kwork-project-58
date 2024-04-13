import TelegramBot from "node-telegram-bot-api"
import { config } from "dotenv"
config({ path: "./assets/.env" })

import { connect } from "./assets/database/connect.js"

import express from "express"
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors());

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
console.log("Bot has success started")
connect()

app.listen(process.env.API_TOKEN, () => {
    console.log(`API running in port: ${process.env.API_TOKEN}`)
})

export {bot, app}
