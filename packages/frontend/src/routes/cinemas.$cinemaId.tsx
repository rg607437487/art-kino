import { Temporal } from '@js-temporal/polyfill'
import { createFileRoute, Link } from '@tanstack/react-router'
import { loadCinemas, DayMovies, type Cinema } from '../lib/libCinemas.tsx'

export const Route = createFileRoute('/cinemas/$cinemaId')({
	component: Cinemas,
	loader: loadCinemas,
})

function Cinemas() {
	const cinemas = Route.useLoaderData()
	const { cinemaId } = Route.useParams()
	const cinema = cinemas?.find(c => c.id === cinemaId) ?? cinemas.at(0)

	return (
		<div className="p-4">
			<CinemaTabs cinemas={cinemas} />
			{cinema && <Cinema {...cinema} />}
		</div>
	)
}

function CinemaTabs(props: { cinemas: Cinema[] }) {
	const { cinemas } = props

	return (
		<ul className="nav nav-underline justify-content-center mb-4">
			{cinemas.map(c => (
				<li className="nav-item b" key={c.id}>
					<Link className="nav-link" to="/cinemas/$cinemaId" params={{ cinemaId: c.id }}>
						{c.name}
					</Link>
				</li>
			))}
		</ul>
	)
}

function Cinema(props: Cinema) {
	const { program } = props

	return (
		<>
			{program.map(p => {
				const { month, day } = Temporal.PlainDate.from(p.date)

				return (
					<div className="" key={p.date}>
						<h3 className="px-4" style={{ color: 'var(--bs-pink)' }}>
							{day}/{month}
						</h3>
						<DayMovies movies={p.movies} />
					</div>
				)
			})}
		</>
	)
}
