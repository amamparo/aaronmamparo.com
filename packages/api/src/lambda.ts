import { argv } from 'bun'

type Response = {
	statusCode: number,
	body?: string
}

export default async function wrap(func: (event: any) => Promise<Response | void>) {
	const result = (await func(JSON.parse(argv[2] ?? '{}'))) ?? { statusCode: 200 }
	console.log(JSON.stringify(result))
}

