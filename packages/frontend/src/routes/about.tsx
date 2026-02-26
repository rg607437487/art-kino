import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
	component: About,
})

function About() {
	return (
		<>
			<h2 className="p-2">Art Kino</h2>
			<div className="p-2">
				This is a private experiment with various web technologies, currently: React,
				TanStack, Zod, Node, Cheerio, Express, Vite, Oxc, Cloudflare, KV
			</div>
		</>
	)
}
