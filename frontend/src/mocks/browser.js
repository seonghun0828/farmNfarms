// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './handlers' // export default로 해줬을 경우 {} 제거
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
