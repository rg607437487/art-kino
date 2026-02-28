import { Temporal } from '@js-temporal/polyfill'
import { useContext } from 'react'
import * as z from 'zod'
import { MediaContext } from '../lib/MediaContext.tsx'

export function DayMovies(props: DayMoviesProps) {
	const { date, movies } = props
	// const { month, day } = Temporal.PlainDate.from(date)

	const { isMobile } = useContext(MediaContext)

	return (
		<>
			<h3 className={`${isMobile ? 'px-3 mt-3' : 'px-4 mt-5b'}`}>
				{/* {day}/{month} */}
				{date}
			</h3>
			<div className={`container ${isMobile ? 'px-3 py-2' : 'px-4 py-3'} card`}>
				{movies.map((m, i) => (
					<div
						className={`row ${isMobile ? 'my-1' : 'my-1'}`}
						key={`${m.title}-${m.time}-${i}`}
					>
						<div className="col text-start condensed-bold" style={{ maxWidth: '65px' }}>
							<b>{m.time}</b>
						</div>
						<div className="col text-start">{m.title}</div>
					</div>
				))}
			</div>
		</>
	)
}

type DayMoviesProps = {
	date: string
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

export function assertCinemaResponse(data: unknown): asserts data is CinemasResponse {
	cinemasResponseSch.parse(data)
}

type CinemasResponse = z.infer<typeof cinemasResponseSch>

export type Cinema = CinemasResponse[number]
export type DayMoviesT = Cinema['program'][number]['movies']
