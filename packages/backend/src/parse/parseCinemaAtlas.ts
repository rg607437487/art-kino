import { Temporal } from '@js-temporal/polyfill'
import * as cheerio from 'cheerio'
import { parseDateWWWDDMM } from './parseLib.ts'

export function parseCinemaAtlas(html: string | null, today: Temporal.PlainDate) {
	if (!html) return []

	const $ = cheerio.load(html)

	const movieAndDayNodes = $('.batch').children()

	let currDate = today.toString()
	let movies = new Map()

	for (const n of movieAndDayNodes) {
		const $n = $(n)

		if ($n.hasClass('date')) {
			const pd = parseDateWWWDDMM($n.text(), today, { MMDD: true })
			currDate = pd.toString()
		}

		if ($n.hasClass('event')) {
			const title = $n.find('.title').text()
			const time = $n.find('.time').text()
			const href = $n.find('a').attr('href')

			movies.set(currDate, [...(movies.get(currDate) ?? []), { title, time, href }])
		}
	}

	const data = [...movies.entries()].map(e => ({ date: e[0], movies: e[1] }))

	return data
}
