import { Temporal } from '@js-temporal/polyfill'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { loadCinemas, DayMovies, type Cinema, type DayMoviesT } from '../lib/libCinemas'
import { MediaContext } from '../lib/MediaContext.tsx'

export const Route = createFileRoute('/dates')({
	component: Dates,
	loader: loadCinemas,
})

function Dates() {
	const cinemas = Route.useLoaderData()
	const { isMobile } = useContext(MediaContext)

	const byDate = toByDates(cinemas)
	const dates = [...byDate.keys()].sort() // WTF .toSorted !!!

	return (
		<div className={`${isMobile ? '' : ''} m-auto`}>
			{dates.map(date => {
				const { month, day } = Temporal.PlainDate.from(date)

				return (
					<div className="" key={date}>
						<h2 className="text-center mt-4 mb-3">
							{day}/{month}
						</h2>

						<Day namesMovies={Object.entries(byDate.get(date) ?? {})} />
					</div>
				)
			})}
		</div>
	)
}

type DayProps = {
	namesMovies: [string, DayMoviesT][]
}

function Day(props: DayProps) {
	const { namesMovies } = props

	return (
		<div
			className="grid"
			style={
				// FUTURE add valid css vars to global types
				{ '--bs-columns': namesMovies.length } as React.CSSProperties
			}
		>
			{namesMovies.map(([name, dayMovies]) => (
				<div className="" key={`${name}`}>
					<h3 className="px-4">
						<Link className="" to="/cinemas">
							{name}
						</Link>
					</h3>
					<DayMovies movies={dayMovies} />
				</div>
			))}
		</div>
	)
}

function toByDates(cinemas: Cinema[]) {
	const byDate = new Map<string, Record<string, DayMoviesT>>()

	for (const c of cinemas) {
		const { name, program } = c
		for (const { date, movies } of program) {
			byDate.set(date, { ...(byDate.get(date) ?? null), [name]: movies })
		}
	}

	return byDate
}
