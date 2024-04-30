import { UserModel } from "../assets/database/models/user.js";

import querystring from "querystring"


export async function chatIdValidation(chatId) {
    chatId = Number(chatId)

    if (!chatId) {
        throw Error("Incorrect chatId")
    }

    const user = await UserModel.findOne({ where: { chatId } });

    if (!user) {
        throw Error("Incorrect chatId cant found user to this chatId")
    }

    return user
}

export async function deCodeTMA(tma) {
    const decodedData = querystring.parse(tma);

    return decodedData
}
