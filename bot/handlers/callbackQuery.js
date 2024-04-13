import { UserModel } from "../../assets/database/models/user.js"
import { bot } from "../../init.js"
import { checkSubscribeKeyboard, profileKeyboard } from "../keyboards/inline.js"
import { channelSubscribeValidation } from "../utils.js"


bot.on("callback_query", async call => {
    const chatId = call.from.id
    const callbackData = call.data

    try {
        const user = await UserModel.findOne({ where: { chatId } });

        if (!user) {
            await UserModel.create({ chatId, username })
        }

        const subscribeStatus = await channelSubscribeValidation(chatId)

        if (!subscribeStatus) { return }


        switch (callbackData) {
            case "invite_friends":
                bot.sendMessage(chatId, `Your personal link: <code>${process.env.BOT_LINK}?start=${chatId}</code>`, { parse_mode: "HTML" })
                break;

            case "check_subscribe":
                bot.sendMessage(chatId, "You success subscribed! Enter the /start command to continue")
                break

            case "profile":
                bot.sendMessage(chatId, `${user.username} profile\n\nYour balance: $${user.balance} PUSH\nInvited friends: ${user.refNum}`, { reply_markup: JSON.stringify(profileKeyboard) })
                break

            default:
                break;
        }

    } catch (error) {
        return bot.sendMessage(chatId, `Error callback_query: ${error}`)
    }
})
