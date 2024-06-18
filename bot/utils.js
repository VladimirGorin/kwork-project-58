import { UserModel } from "../assets/database/models/user.js";
import { bot } from "../init.js";
import { checkSubscribeKeyboard, profileKeyboard } from "./keyboards/inline.js";


export async function channelSubscribeValidation(userId) {
  const data = await bot.getChatMember(process.env.CHANNEL_ID, userId);
  const user = await UserModel.findOne({ where: { chatId: userId } });

  if (data.status !== "left") {
    if (!user?.isSubscribe) {
      bot.sendMessage(userId, "You success subscribed!")

      user.isSubscribe = true
      user.save()

    }

    return true
  }

  bot.sendMessage(userId, `First subscribe to the channel: @${process.env.CHANNEL}`, { reply_markup: JSON.stringify(checkSubscribeKeyboard) })
}

export function inviteFriendsHandler(chatId) {
  bot.sendMessage(chatId, `Your personal link: <code>https://t.me/${process.env.BOT_LINK}?start=${chatId}</code>`, { parse_mode: "HTML" })
}

export function claimHandler(chatId) {
  bot.sendMessage(chatId, `Coming Soon`)
}

export function profileHandler(user) {
  user.balance = user.refCoins + user.gameCoins
  user.save()

  bot.sendMessage(user.chatId, `${user.username} profile\n\nYour balance: ${user.balance} $PUSH\nInvited friends: ${user.refNum}`, { reply_markup: JSON.stringify(profileKeyboard) })
}

export function setMyCommands() {
  bot.setMyCommands([
    { command: "/start", description: "Play Pushcoin" },
    { command: "/friends", description: "Invite friends to the game" },
    { command: "/profile", description: "Balance and friends" }
  ])
}
