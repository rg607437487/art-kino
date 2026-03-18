import { Temporal } from '@js-temporal/polyfill'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { loadCinemas, DayMovies, type Cinema } from '../lib/libCinemas'
import { MediaContext } from '../lib/MediaContext.tsx'

export const Route = createFileRoute('/cinemas')({
	component: Cinemas,
	loader: loadCinemas,
})

function Cinemas() {
	const cinemas = Route.useLoaderData()
	const { isMobile } = useContext(MediaContext)

	return (
		<div className={`${isMobile ? 'container' : 'container-lg'} m-auto`}>
			<div
				className="grid"
				style={
					// FUTURE add valid css vars to global types
					{ '--bs-columns': cinemas.length } as React.CSSProperties
				}
			>
				{cinemas.map(c => (
					<div className={`${isMobile ? '' : ''}`} key={c.id}>
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
		<>
			<h2 className="text-center mt-4">{name}</h2>

			{program.map(p => {
				const { month, day } = Temporal.PlainDate.from(p.date)

				return (
					<div className="" key={p.date}>
						<h3 className="px-4">
							<Link className="" to="/dates">
								{day}/{month}
							</Link>
						</h3>
						<DayMovies movies={p.movies} />
					</div>
				)
			})}
		</>
	)
}
