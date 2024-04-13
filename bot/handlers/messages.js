import { UserModel } from "../../assets/database/models/user.js"
import { bot } from "../../init.js"

import { channelSubscribeValidation } from "../utils.js"
import { startKeyboard } from "../keyboards/inline.js"

bot.on("message", async msg => {
    const chatId = msg.from.id
    const text = msg.text
    const username = `@${msg.from?.username}` || msg.from.first_name

    const ref = text.replace(/\s/g, "").replace("/start", "")

    try {
        if (Boolean(ref)) {
            if (Number(ref)) {
                const owner = await UserModel.findOne({ where: { chatId: ref} })

                if (!owner) {
                    throw Error("Cant found owner of the ref")
                }

                if (owner.chatId == chatId) {
                    throw Error("Owner cant use the ref link")
                }

                owner.refCoins += 500
                owner.balance += 500
                owner.refNum += 1
                owner.save()

                bot.sendMessage(chatId, "Ref link used success!")

            } else {
                throw Error("Incorrect ref owner")
            }
        }
    } catch (error) {
        bot.sendMessage(chatId, `Error with ref: ${error}`)
    }

    try {
        const user = await UserModel.findOne({ where: { chatId } });

        if (!user) {
            await UserModel.create({ chatId, username })
        }

        const subscribeStatus = await channelSubscribeValidation(chatId)

        if (!subscribeStatus) { return }

        switch (text) {
            case "/start":
                bot.sendPhoto(chatId, "./assets/images/main.png", { caption: `Hello ${user.username} This is Pushcoin.\n\nPush coins and watch your balance grow.\nDo you have any friends? Invite them to the game. This way you will get even more coins together.\n\n500 $PUSH - for one referred friend 😱`, reply_markup: JSON.stringify(startKeyboard) })
                break;

            default:
                break;
        }

    } catch (error) {
        return bot.sendMessage(chatId, `Error message: ${error}`)
    }

})
