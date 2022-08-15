import { rest } from 'msw'
import apiPath from '../../common/apiPath';

export default rest.get(apiPath.price.main(), (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      message: '정상',
      statusCode: 200,
      product: [
        {
          name: "배추",
          price: "19,540",
          unit: "10kg",
          direction: "0",
          value: "1.8",
        },
        {
          name: "오이",
          price: "20,000",
          unit: "10kg",
          direction: "1",
          value: "10.2",
        },
        {
          name: "토마토",
          price: "20,180",
          unit: "5kg",
          direction: "2",
          value: "0.0",
        },
        {
          name: "당근",
          price: "42,160",
          unit: "20kg",
          direction: "1",
          value: "0.5",
        },
        {
          name: "무",
          price: "24,240",
          unit: "20kg",
          direction: "1",
          value: "10.4",
        },
        {
          name: "감자",
          price: "41,140",
          unit: "20kg",
          direction: "1",
          value: "0.6",
        },
      ],
    })
  )
});

