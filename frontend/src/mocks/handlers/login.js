import { rest } from 'msw'

export const login = [
  // Handles a POST /login request
  rest.post('/login', null),
]
