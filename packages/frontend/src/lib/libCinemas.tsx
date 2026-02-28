import { Temporal } from '@js-temporal/polyfill'

export function DayMovies(props: DayMoviesProps) {
	const { date, movies } = props
	const { month, day } = Temporal.PlainDate.from(date)

	// TODO move to context
	const isMobileMedia = window.matchMedia('(max-width: 431px)') // 430 iPhone Pro Max 14
	const isMobile = isMobileMedia.matches

	return (
		<>
			<h3 className={`${isMobile ? 'px-3 mt-3' : 'px-4 mt-5'}`}>
				{day}/{month}
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
