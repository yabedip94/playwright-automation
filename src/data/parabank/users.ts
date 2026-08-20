const username = `bediqa${Date.now()}`;

export const USERS = {
    validUser: {
        username: username,
        password: 'Password123!',
    },

    invalid: {
        username: 'invalid_user',
        password: 'wrong_password',
    },

    emptyUsername: {
        username: '',
        password: 'Password123!',
    },

    emptyPassword: {
        username: username,
        password: '',
    },

    emptyUsernameAndPassword: {
        username: '',
        password: '',
    },
};