import { useContext } from 'react'
import { DayMovies, type Cinema, type DayMoviesT } from './libCinemas.tsx'
import { MediaContext } from './MediaContext.tsx'

export function CinemasByDate(props: CinemasByDateProps) {
	const { cinemas } = props

	const byDate = new Map<string, Record<string, DayMoviesT>>()

	for (const c of cinemas) {
		const { name, program } = c
		for (const { date, movies } of program) {
			byDate.set(date, { ...(byDate.get(date) ?? null), [name]: movies })
		}
	}

	const dates = [...byDate.keys()].sort() // WTF toSorted !!!

	const { isMobile } = useContext(MediaContext)

	// TODO use native css grid

	return (
		<div className={`${isMobile ? 'container' : 'container-lg'} m-auto`}>
			<div className="row">
				{dates.map(date => {
					return (
						<div className="col-12" key={date}>
							<h2 className="text-center mt-4">{date}</h2>

							{Object.entries(byDate.get(date) ?? {}).map(entry => {
								const [name, dayMovies] = entry
								return (
									<div className="" key={`${date}-${name}`}>
										<DayMovies date={name} movies={dayMovies} />
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
		</div>
	)
}

type CinemasByDateProps = {
	cinemas: Cinema[]
}
