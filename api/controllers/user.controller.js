import { chatIdValidation } from "../utils.js";

export async function getBalance(req, res) {
    try {
        let { chatId } = req.body

        const user = await chatIdValidation(chatId)

        user.balance = user.refCoins + user.gameCoins
        user.save()

        res.status(200).send({"balance": user.balance})

    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}

export async function setBalance(req, res) {
    try {
        let { chatId, balance } = req.body

        balance = Number(balance)
        if (!balance) {
            throw Error("Incorrect balance its must to be Number")
        }

        const user = await chatIdValidation(chatId)

        user.gameCoins = balance
        user.balance = user.refCoins + user.gameCoins

        user.save()

        res.status(200).send({"balance": user.balance})

    } catch (error) {
        res.status(400).send(error.message);
        return;
    }
}
