// 실험용! 지워도 됨!
import { rest } from 'msw'

export default rest.get('/users', (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      users: [
        {
          id: 1,
          name: 'ggagul',
          age: 20
        },
        {
          id: 2,
          name: "jojo",
          age: 20
        },
        {
          id: 3,
          name: "mukyee",
          age: 20
        }
      ],
    })
  )
})