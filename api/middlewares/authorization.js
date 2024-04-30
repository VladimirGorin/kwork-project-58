import { validate } from '@tma.js/init-data-node';
import { chatIdValidation, deCodeTMA } from '../utils.js';

export async function authMiddleware(req, res, next) {
  try {
    const { chatId } = req.body
    const [authType, authData = ''] = (req.header('authorization') || '').split(' ');

    const decodedTMA = await deCodeTMA(authData)

    if (!Object.keys(decodedTMA).length) {
      throw Error("Incorrect TMA")
    }

    try {
      const decodedUser = JSON.parse(decodedTMA.user)
      const user = await chatIdValidation(decodedUser.id)

      if (!chatId) {
        throw Error("Request param chatId is undefined")
      } else if (!user.chatId) {
        throw Error("User chatId is undefined")
      }

      if (chatId != user.chatId) {
        throw Error("Request param chatId not the same TMA chatId")
      }

    } catch (error) {
      throw Error(`Error: While try parse the user data: ${error}`)
    }


    switch (authType) {
      case "tma":
        validate(authData, process.env.BOT_TOKEN, {
          expiresIn: 3600,
        });

        // res.send(`Success! Your tma: ${parse(authData)} `)
        next()
        break;

      default:
        throw Error("Error provide the TMA")
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
