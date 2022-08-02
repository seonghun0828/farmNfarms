const HOST = 'https://i7b203.p.ssafy.io:8080/api/v1/';

const AUTH = 'auth/';
const USER = 'user/';
const VERIFICATION = 'verifications/';

const apiPath = {
    auth: {
        login: () => HOST + AUTH + 'login/',
        reaccess: () => HOST + AUTH + 'reaccess',
    },

    user: {
        join: () => HOST + USER,
        delete: () => HOST + USER,
        get: (phone) => HOST + USER + `${phone}/`,
        update: (phone) => HOST + USER + `${phone}/`,
    },
    verification: {
        create: () => HOST + VERIFICATION,
        send: (id) => HOST + VERIFICATION + `${id}/`,
    }
}

export default apiPath;