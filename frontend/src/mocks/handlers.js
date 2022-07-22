// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),

  // Handles a GET /user request
  rest.get('/user', null),

  rest.get('/users', (req, res, ctx) => {
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
  }),

]
