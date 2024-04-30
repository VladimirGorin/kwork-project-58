import { UserModel } from "../../assets/database/models/user.js"
import { bot } from "../../init.js"
import { howToPlayKeyboard } from "../keyboards/inline.js"

import { channelSubscribeValidation, inviteFriendsHandler, profileHandler } from "../utils.js"


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
                inviteFriendsHandler(chatId)
                break;

            case "check_subscribe":
                bot.sendMessage(chatId, "You success subscribed! Enter the /start command to continue")
                break

            case "profile":
                profileHandler(user)
                break

            case "how_to_play":
                bot.sendPhoto(chatId, "./assets/images/howToPlay.png", { caption: `Pushcoin is a slot machine from an amusement park. Play @${process.env.BOT_LINK} and earn $PUSH coins. For every toy you push, you will get 500 $PUSH. You can also use boosters. And then the reward for each toy will be 1000 $PUSH, 1500 $PUSH or 2000 $PUSH\n\nYour game balance save when you push the toy ⚠️\n\nDo you have any friends? Invite them to the game. 500 $PUSH - for one referred friend 😱\n\nPlay every day. Every 24 hours you can get 100 $PUSH by logging into the game\n\n\n🤝 If you are interested in becoming our partner, please fill out the <a href="https://forms.gle/HX8XMPx6PXySqYYd9">form</a> to establish affiliate relations. Early investors can fill out this <a href="https://forms.gle/LYUCdvacyE5Jci1y7">form</a>.\n\n🎁 35% of Tokens are allocated for Community Airdrop!\n\n✅ Community: @${process.env.BOT_COMMUNITY}\n💭 Chat @${process.env.BOT_CHAT}\n🚀 X: https://x.com/${process.env.BOT_X}`, reply_markup: howToPlayKeyboard, parse_mode: "HTML" })
                break;

            default:
                break;
        }

    } catch (error) {
        return bot.sendMessage(chatId, `Error callback_query: ${error}`)
    }
})
