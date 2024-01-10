import app from './app.ts'

Bun.serve({
	port: 3000,
	fetch(request) {
		console.log(request)
		return app.handle(request)
	}
})