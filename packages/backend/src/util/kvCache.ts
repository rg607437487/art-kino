import { Temporal } from '@js-temporal/polyfill'
import * as z from 'zod'

const cacheRecordSch = z.object({
	timestamp: z.string(), // plainDateISO
	data: z.any(),
})

export function createCache(kv: KVNamespace) {
	return {
		async get(key: string) {
			// MAYBE try? or maybe just at the top in the express error handler?

			const cachedStr = await kv.get(key)

			if (!cachedStr) return null

			const cached = cacheRecordSch.parse(JSON.parse(cachedStr))

			// cache valid only during the same calendar day
			const today = Temporal.Now.plainDateISO()
			const isValid = Temporal.PlainDate.from(cached.timestamp).equals(today)

			if (isValid) {
				return cached.data
			}

			return null
		},
		async set(key: string, data: any) {
			const today = Temporal.Now.plainDateISO()
			const dataStr = JSON.stringify({ timestamp: today, data })
			await kv.put(key, dataStr)
		},
	}
}
