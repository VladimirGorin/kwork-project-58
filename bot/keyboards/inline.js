export const checkSubscribeKeyboard = {
    inline_keyboard: [[{ text: "Check", callback_data: "check_subscribe" }]],
};

export const startKeyboard = {
    inline_keyboard: [
        [
            {
                text: "Play",
                callback_data: "play",
                url: `https://t.me/${process.env.BOT_LINK}/play`,
            },
        ],
        [{ text: "Missions", web_app: { url: `https://${process.env.MODE === "production" ? `${process.env.SITE_LINK}/missions` : `${process.env.SITE_TEST_LINK}` }` } }],
        [{ text: "How to Play", callback_data: "how_to_play" }],
        [{ text: "Invite Friends", callback_data: "invite_friends" }],
        [{ text: "Profile", callback_data: "profile" }]

    ],
};

export const profileKeyboard = {
    inline_keyboard: [
        [
            {
                text: "Play",
                callback_data: "play",
                url: `https://t.me/${process.env.BOT_LINK}/play`,
            },
        ],
        [{ text: "Invite Friends", callback_data: "invite_friends" }],
    ],
};

export const howToPlayKeyboard = {
    inline_keyboard: [
        [
            {
                text: "Play",
                callback_data: "play",
                url: `https://t.me/${process.env.BOT_LINK}/play`,
            },
        ],
        [{ text: "Invite Friends", callback_data: "invite_friends" }],
    ],
};
