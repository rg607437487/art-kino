import { Temporal } from '@js-temporal/polyfill'
import * as cheerio from 'cheerio'
import { parseDateWWWDDMM } from './parseLib.ts'

export function parseCinemaAero(html: string | null, date: Temporal.PlainDate) {
	if (!html) return []

	const $ = cheerio.load(html)

	const dayNodes = $('.program')

	const days = dayNodes.map((_, dn) => {
		const dateRaw = $(dn).find('.desktop')?.text()

		const dateParsed = parseDateWWWDDMM(dateRaw, date)

		const movieNodes = $(dn).find('.program__info-row')

		const movies = movieNodes.map((_, rn) => {
			const $rn = $(rn)
			const $name = $rn.find('.program__movie-name')
			const $time = $rn.find('.program__hour')

			return {
				title: $name?.text(),
				href: 'https://www.kinoaero.cz/en?projection=' + $name?.attr('data-projection'),
				time: $time?.text(),
			}
		})

		return {
			date: dateParsed?.toString() || null,
			movies: movies.toArray(),
		}
	})

	return days.toArray()
}
