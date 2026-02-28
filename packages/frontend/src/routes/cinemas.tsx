import { createFileRoute } from '@tanstack/react-router'
import * as z from 'zod'
import { DayMovies } from '../lib/libCinemas.tsx'

export const Route = createFileRoute('/cinemas')({
	component: Cinemas,
	loader: loadCinemas,
})

function Cinemas() {
	const cinemas = Route.useLoaderData()

	return (
		<div className="container m-auto">
			<div className="row">
				{cinemas.map(c => (
					<div className="col-sm-6" key={c.id}>
						<Cinema {...c} />
					</div>
				))}
			</div>
		</div>
	)
}

function Cinema(props: Cinema) {
	const { name, program } = props

	return (
		<div className="">
			<h2 className="text-center mt-4">{name}</h2>

			{program.map(p => (
				<div className="" key={p.date}>
					<DayMovies {...p} />
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
				date: z.string(),
				movies: z.array(
					z.object({
						title: z.string(),
						time: z.string(),
						href: z.string(),
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
