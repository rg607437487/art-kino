import { getCinemas } from './getCinemas.ts'

const DAY_MS = 24 * 60 * 60 * 1000
const cache = new Map<string, { timestamp: number; data: any }>()

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/name")) {
		return Response.json({ name: "Cloudflare4"});
    }

    if (url.pathname.startsWith("/api/cinema")) {
		if (cache.has('/api/cinema')) {
			const cached = cache.get('/api/cinema')

			if (cached && Date.now() - cached.timestamp < DAY_MS) {

				Response.json(cached.data)
			}
		}

		const data = await getCinemas()
		cache.set('/api/cinemas', { timestamp: Date.now(), data })

		return Response.json(data)
    }

    return new Response(null, { status: 404 });
  },
} satisfies ExportedHandler;