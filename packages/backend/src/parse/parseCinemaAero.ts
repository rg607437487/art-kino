import { Temporal } from '@js-temporal/polyfill'
import * as cheerio from 'cheerio';


export function parseCinemaAero(html: string | null, date: Temporal.PlainDate) {
	if (!html) return []

	const $ = cheerio.load(html)

	const dayNodes = $('.program')

	const days = dayNodes.map((_, dn) => {
		const dateRaw = $(dn).find('.desktop')?.text()

		const dateParsed = (() => {
			if (dateRaw === 'Today') return date
			if (dateRaw === 'Tomorrow') return date.add({ days: 1 })

			const [_, d, m] = dateRaw?.split(/[ /]/) ?? []
			if (d && m) {
				return Temporal.PlainDate.from({
					year: date.year,
					month: Number(m),
					day: Number(d),
				})
			}
			console.error(`Unknown date format: ${dateRaw}`)

			return null
		})()

		const movieNodes = $(dn).find('.program__info-row')

		const movies = movieNodes.map((_, rn) => ({
			title: $(rn).find('.program__movie-name')?.text(),
			time: $(rn).find('.program__hour')?.text(),
		}))

		return {
			date: dateParsed?.toString() || null,
			movies: movies.toArray(),
		}
	})

	return days.toArray()
}
