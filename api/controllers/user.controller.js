import { inviteFriendsHandler, claimHandler } from "../../bot/utils.js";
import { chatIdValidation } from "../utils.js";


export async function getBalance(req, res) {
    try {
        let { chatId } = req.body

        const user = await chatIdValidation(chatId)

        user.balance = user.refCoins + user.gameCoins
        user.appStarts += 1

        user.save()

        res.status(200).send({"balance": user.balance, "booster": user.booster})

    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}

export async function setBalance(req, res) {
    try {
        let { chatId, balance, booster } = req.body

        balance = Number(balance)

        if (!balance) {
            throw Error("Incorrect balance its must to be Number")
        }
        const user = await chatIdValidation(chatId)

        if (booster){
            user.booster = booster
        }


        user.gameCoins = balance - user.refCoins
        user.balance = user.refCoins + user.gameCoins
        user.appStarts += 1
        user.balanceSets += 1

        user.save()

        res.status(200).send({"balance": user.balance})

    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}

export async function runFiends(req, res) {
    try {
        let { chatId } = req.body

        const user = await chatIdValidation(chatId)

        inviteFriendsHandler(user.chatId)

        res.status(200).send({"status": true})
    } catch (error) {
        res.status(400).send({"status": false, "message": error.message});
        return;
    }
}

export async function runClaim(req, res) {
    try {
        let { chatId } = req.body

        const user = await chatIdValidation(chatId)

        claimHandler(user.chatId)

        res.status(200).send({"status": true})
    } catch (error) {
        res.status(400).send({"status": false, "message": error.message});
        return;
    }
}
