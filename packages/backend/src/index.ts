import { getCinemas } from './getCinemas.ts'
import { createCache } from './util/kvCache.ts'

const API_CINEMA = '/api/cinema'
const API_NAME = '/api/name'

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const cache = createCache(env.ART_KINO_CACHE)
	
		if (url.pathname.startsWith(API_CINEMA)) {
			const cached = await cache.get(API_CINEMA)

			if (cached) {
				return Response.json(cached)
			}

			const data = await getCinemas()
			cache.set(API_CINEMA, data)

			return Response.json(data)
		}

		if (url.pathname.startsWith(API_NAME)) {
			return Response.json({ name: "Cloudflare5"});
		}

		return new Response(null, { status: 404 });
	},
} satisfies ExportedHandler<Env>;

interface Env {
  ART_KINO_CACHE: KVNamespace;
}