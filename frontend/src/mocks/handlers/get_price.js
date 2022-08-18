import { rest } from 'msw'
import apiPath from '../../common/apiPath';

export default rest.get(apiPath.price.all(), (req, res, ctx) => {

  // request 데이터 어케 받음?? ㅠ 
  return res(
    ctx.delay(50),
    ctx.status(200),
    ctx.json({
      message: '정상',
      statusCode: 200,
      data: {
        product: "배추",
        price: {
            thisYear : {
            d0: '6866',
            d10: '7699',
            d20: '10000',
            d30: '8382',
            avg: '10000',
            year: '2022',
          },
            lastYear : {
            d0: '11320',
            d10: '13720',
            d20: '13320',
            d30: '13470',
            avg: '12800',
            year: '2021',
          },
        },
      }
    })
  )
});

