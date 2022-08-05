const HOST = 'https://i7b203.p.ssafy.io:9000/api/v1/';

const AUTH = 'auth/';
const USER = 'user/';
const VERIFICATION = 'verifications/';
const PRICE = 'price/';
const ROOM = 'rooms/';

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
  },
  room: {
    rooms: () => HOST + ROOM,
    search: () => HOST + ROOM + 'search',
  },
  // 아래부터 임시
  price: {
    main: () => HOST + PRICE + 'main/',
  },
};

export default apiPath;
