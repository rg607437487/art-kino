import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'

export const Route = createFileRoute('/cinemas')({
	component: Cinemas,
	loader: loadCinemas,
})

function Cinemas() {
	const cinemas = Route.useLoaderData()

	return (
		<>
			{cinemas.map(c => (
				<Cinema key={c.id} {...c} />
			))}
		</>
	)
}

function Cinema(props: Cinema) {
	const { name, program } = props

	return (
		<div className="p-2">
			<h2>{name}</h2>

			{program.map(p => (
				<div className="ms-3" key={p.date}>
					<h3>{p.date}</h3>
					<div className="container text-center mb-2">
						{p.movies.map((m, i) => (
							<div className="row" key={`${m.title}-${m.time}-${i}`}>
								<div className="col-2 text-start">
									<b>{m.time}</b>
								</div>
								<div className="col-10 text-start">{m.title}</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

async function loadCinemas() {
	try {
		const resp = await fetch('/api/cinema')

		if (!resp.ok) {
			throw new Error(resp.statusText || 'Failed to fetch cinemas')
		}

		const data = await resp.json()
		assertCinemaResponse(data)

		return data
	} catch (e) {
		console.error(e)

		return []
	}
}

const cinemasResponseSch = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		program: z.array(
			z.object({
				date: z.string().nullable(),
				movies: z.array(
					z.object({
						title: z.string().nullable(),
						time: z.string().nullable(),
						href: z.string().nullable(),
					}),
				),
			}),
		),
	}),
)

function assertCinemaResponse(data: unknown): asserts data is CinemasResponse {
	cinemasResponseSch.parse(data)
}

type CinemasResponse = z.infer<typeof cinemasResponseSch>
type Cinema = CinemasResponse[number]
