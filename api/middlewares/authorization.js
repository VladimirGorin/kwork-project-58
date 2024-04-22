import { validate, parse } from '@tma.js/init-data-node';

export async function authMiddleware(req, res, next) {
    try {
        const [authType, authData = ''] = (req.header('authorization') || '').split(' ');


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
