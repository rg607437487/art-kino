import * as z from 'zod'

const VALIDITY_MS = 24 * 60 * 60 * 1000

const cacheRecordSch = z.object({
	timestamp: z.number(),
	data: z.any(),
})

export function createCache(kv: KVNamespace) {
	return {
		async get(key: string) {
			// MAYBE try/get anybody? or maybe at the top in the express error handler?

			const cachedStr = await kv.get(key)

			if (!cachedStr) return null

			const cached = cacheRecordSch.parse(JSON.parse(cachedStr))

			if (Date.now() - cached.timestamp < VALIDITY_MS) {
				return cached.data
			}

			return null
		},
		async set(key: string, data: any) {
			const dataStr = JSON.stringify({ timestamp: Date.now(), data })
			await kv.put(key, dataStr)
		},
	}
}
