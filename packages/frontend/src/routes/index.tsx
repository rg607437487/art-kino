import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: Index,
})

function Index() {
	return (
		<>
			<div className="p-4">
				This is a private experiment with various web technologies, currently: React,
				TanStack, Zod, Node, Cheerio, Express, Vite, Oxc, Cloudflare, KV
			</div>
		</>
	)
}
