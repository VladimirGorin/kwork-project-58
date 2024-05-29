import { UserModel } from "../../assets/database/models/user.js";

export function verifyAuth(req, res) {
    try {

        const { password, username } = req.body

        if ( process.env.ADMIN_USERNAME !== username   || process.env.ADMIN_PASSWORD !== password){
            throw Error("Error incorrect params")
        }

        res.status(200).send({ "authStatus": true })
    } catch (error) {
        res.status(400).send({ "authStatus": false, "errorMessage": error.message })
        return;
    }
}


export async function getUsers(req, res) {
    try {

        // const { password, username } = req.body

        // if ( process.env.ADMIN_USERNAME !== username   || process.env.ADMIN_PASSWORD !== password){
        //     throw Error("Error incorrect params")
        // }

        const users = await UserModel.findAll()

        res.status(200).send({ users })
    } catch (error) {
        res.status(400).send({ "users": [], "errorMessage": error.message })
        return;
    }
}

export async function updateUsers(req, res) {
    try {

        const updatedData = req.body

        const chatId = String(updatedData.chatId)

        const user = await UserModel.findOne({ where: { chatId } });


        if (!user) {
            throw Error("Incorrect chatId cant found user to this chatId")
        }

        user.set({
            ...updatedData,
            id: String(updatedData.id),
            chatId,
            username: String(updatedData.username),
            isSubscribe: Boolean(updatedData.isSubscribe),
            startDate: String(updatedData.startDate),
            balance: Number(updatedData.balance),
            refCoins: Number(updatedData.refCoins),
            refNum: Number(updatedData.refNum),
            gameCoins: Number(updatedData.gameCoins),
            appStarts: Number(updatedData.appStarts),
            balanceSets: Number(updatedData.balanceSets),
            booster: Number(updatedData.booster)
        });

        await user.save();

        res.status(200).send({ "status": true, })
    } catch (error) {
        res.status(400).send({ "status": false, "errorMessage": error.message })
        return;
    }
}
