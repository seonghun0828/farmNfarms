const HOST = 'https://i7b203.p.ssafy.io:9000/api/v1/';

const AUTH = 'auth/';
const USER = 'user/';
const VERIFICATIONS = 'verifications/';
const PRICE = 'price/';
const ROOMS = 'rooms/';
const PAY = 'pay/';
const RESULT = 'result/';

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
    search: () => HOST + ROOMS + 'search/',
    detail: (roomNumber) => HOST + ROOMS + 'details/' + `${roomNumber}/`,
    saveImg: () => HOST + ROOMS + 'save/img',
    loadImg: () => HOST + ROOMS + 'load/img',
    createRoom: (phone) => HOST + ROOMS + 'create-room/' + `${phone}/`,
    deleteRoom: (roomNumber) => HOST + ROOMS + `${roomNumber}/`
  },
  price: {
    all: () => HOST + PRICE + 'date/',
    main: () => HOST + PRICE + 'main/',
  },
  pay: {
    pay: () => HOST + PAY,
    success: () => HOST + PAY + 'success/',
  },
  result: {
    create: () => HOST + RESULT,
    buy: () => HOST + RESULT + 'buy/',
    buyDetail: () => HOST + RESULT + 'buy/detail/',
    sell: () => HOST + RESULT + 'sell/',
    sellDetail: () => HOST + RESULT + 'sell/detail/',
  }
};

export default apiPath;