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
                bot.sendPhoto(chatId, "./assets/images/howToPlay.png", { caption: "Pushcoin is a slot machine from an amusement park. Play @push_coin_bot and earn $PUSH coins. For every toy you push, you will get 500 $PUSH. You can also use boosters. And then the reward for each toy will be 1000 $PUSH, 1500 $PUSH or 2000 $PUSH\n\nDo you have any friends? Invite them to the game. 500 $PUSH - for one referred friend 😱\n\nPlay every day. Every 24 hours you can get 100 $PUSH by logging into the game\n\n\n🤝 If you're interested in becoming our partner, please contact @Pushcoinz to establish affiliate relations.\n\n🎁 35% of Tokens are allocated for Community Airdrop!\n\n✅ Community: @push_coin\n💭 Chat @push_coin_chat\n🚀 X: https://x.com/pushcoin_world", reply_markup: howToPlayKeyboard })
                break;

            default:
                break;
        }

    } catch (error) {
        return bot.sendMessage(chatId, `Error callback_query: ${error}`)
    }
})
