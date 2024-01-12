import { Elysia } from 'elysia'
import wrap from './lambda'

const api = new Elysia()
	.get('/', () => ({}))
	.get('/hello', () => ({ hello: 'world' }))


await wrap(async ({ path, httpMethod: method, queryStringParameters }) => {
	const url = `http://localhost${path}?${new URLSearchParams(queryStringParameters ?? {}).toString()}`
	const response = await api.fetch(new Request(url, { method }))
	return {
		statusCode: response.status,
		body: await response.text()
	}
})
