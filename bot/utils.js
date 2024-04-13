import { UserModel } from "../assets/database/models/user.js";
import { bot } from "../init.js";
import { checkSubscribeKeyboard } from "./keyboards/inline.js";


export async function channelSubscribeValidation(userId) {
  const data = await bot.getChatMember(process.env.CHANNEL_ID, userId);
  const user = await UserModel.findOne({ where: { chatId: userId} });

  if (data.status !== "left") {
    if (!user?.isSubscribe){
      bot.sendMessage(userId, "You success subscribed!")

    user.isSubscribe = true
    user.save()

  }

  return true
}

bot.sendMessage(userId, `You not subscribe! : @${process.env.CHANNEL}`, { reply_markup: JSON.stringify(checkSubscribeKeyboard) })
}
