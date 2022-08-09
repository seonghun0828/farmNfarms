const HOST = 'https://i7b203.p.ssafy.io:9000/api/v1/';

const AUTH = 'auth/';
const USER = 'user/';
const VERIFICATIONS = 'verifications/';
const PRICE = 'price/';
const ROOMS = 'rooms/';
const PAY = 'pay/';

const apiPath = {
  auth: {
    login: () => HOST + AUTH + 'login/',
    logout: () => HOST + AUTH + 'logout/',
    reissue: () => HOST + AUTH + 'reissue/',
  },

  user: {
    join: () => HOST + USER,
    delete: () => HOST + USER,
    get: (phone) => HOST + USER + `${phone}/`,
    update: (phone) => HOST + USER + `${phone}/`,
  },
  verification: {
    create: () => HOST + VERIFICATIONS,
    send: (id) => HOST + VERIFICATIONS + `${id}/`,
  },
  room: {
    rooms: () => HOST + ROOMS,
    search: () => HOST + ROOMS + 'search',
    saveImg: () => HOST + ROOMS + 'save/img',
    createRoom: (phone) => HOST + ROOMS + 'create-room/' + phone 
  },
  // 아래부터 임시
  price: {
    all: () => HOST + PRICE,
    main: () => HOST + PRICE + 'main/',
  },
  pay: {
    pay: () => HOST + PAY,
    success: () => HOST + PAY + 'success/',
  }
};

export default apiPath;
