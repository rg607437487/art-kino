import { useContext } from 'react'
import * as z from 'zod'
import { MediaContext } from '../lib/MediaContext.tsx'

export function DayMovies(props: DayMoviesProps) {
	const { movies } = props
	const { isMobile } = useContext(MediaContext)

	return (
		<div className={`${isMobile ? 'px-3 py-2' : 'px-4 py-3'} card`}>
			{movies.map((m, i) => (
				<div
					className={`row ${isMobile ? 'my-1' : 'my-1'}`}
					key={`${m.title}-${m.time}-${i}`}
				>
					<div className="col text-start condensed-bold" style={{ maxWidth: '65px' }}>
						<b>{m.time}</b>
					</div>
					<div className="col text-start">
						<a href={m.href} target="_blank" rel="noopener noreferrer">
							{m.title}
						</a>
					</div>
				</div>
			))}
		</div>
	)
}

type DayMoviesProps = {
	movies: {
		title: string
		time: string
		href: string
	}[]
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

export async function loadCinemas() {
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

function assertCinemaResponse(data: unknown): asserts data is CinemasResponse {
	cinemasResponseSch.parse(data)
}

type CinemasResponse = z.infer<typeof cinemasResponseSch>

export type Cinema = CinemasResponse[number]
export type DayMoviesT = Cinema['program'][number]['movies']
