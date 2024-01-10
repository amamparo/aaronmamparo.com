import { Elysia } from 'elysia'

const app = new Elysia()
	.get('/', () => ({}))
	.get('/hello', () => ({ hello: 'world' }))

export default app
