export const checkSubscribeKeyboard = {
    inline_keyboard: [
        [{ text: 'Check', callback_data: 'check_subscribe' }]
    ]
};

export const startKeyboard = {
    inline_keyboard: [
        [{ text: 'Play', callback_data: 'play', url: `${process.env.BOT_LINK}/play` }],
        [{ text: 'How to Play', callback_data: 'how_to_play' }],
        [{ text: 'Invite Friends', callback_data: 'invite_friends' }],
        [{ text: 'Profile', callback_data: 'profile' }],
    ]
};

export const profileKeyboard = {
    inline_keyboard: [
        [{ text: 'Play', callback_data: 'play', url: `${process.env.BOT_LINK}/play` }],
        [{ text: 'Invite Friends', callback_data: 'invite_friends' }],
    ]
}
