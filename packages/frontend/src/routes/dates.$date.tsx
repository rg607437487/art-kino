import { Temporal } from '@js-temporal/polyfill'
import { createFileRoute, Link } from '@tanstack/react-router'
import { loadCinemas, DayMovies, type Cinema, type DayMoviesT } from '../lib/libCinemas'

export const Route = createFileRoute('/dates/$date')({
	component: Dates,
	loader: loadCinemas,
})

function Dates() {
	const cinemas = Route.useLoaderData()
	const { date } = Route.useParams()

	const byDate = toByDates(cinemas)
	const dates = [...byDate.keys()].toSorted()

	return (
		<div className="p-4">
			<DateTabs dates={dates} />
			<Day namesMovies={Object.entries(byDate.get(date) ?? {})} />
		</div>
	)
}

function DateTabs(props: { dates: string[] }) {
	const { dates } = props

	return (
		<ul className="nav nav-underline justify-content-center mb-3">
			{dates.map(d => (
				<li className="nav-item h3" key={d}>
					<Link className="nav-link" to="/dates/$date" params={{ date: d }}>
						{(() => {
							const { month, day } = Temporal.PlainDate.from(d)
							return `${day}/${month}`
						})()}
					</Link>
				</li>
			))}
		</ul>
	)
}

function Day(props: DayProps) {
	const { namesMovies } = props

	return (
		<>
			{namesMovies.map(([name, dayMovies]) => (
				<div className="" key={`${name}`}>
					<h3 className="px-4" style={{ color: 'var(--bs-pink)' }}>
						{name}
					</h3>
					<DayMovies movies={dayMovies} />
				</div>
			))}
		</>
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

type DayProps = {
	namesMovies: [string, DayMoviesT][]
}
