import { Elysia } from 'elysia'

const port = process.env.PORT || 3000

new Elysia()
	.get('/hello', () => ({ hello: 'world' }))
	.listen(port, () => console.log(`Listening on port ${port}`))
