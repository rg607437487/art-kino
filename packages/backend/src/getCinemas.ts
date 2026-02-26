import { Temporal } from '@js-temporal/polyfill'
import { parseCinemaAero } from './parse/parseCinemaAero.ts'

export async function getCinemas() {
	const date = Temporal.Now.plainDateISO()

	const cinemas = [
		{
			id: 'aero',
			name: 'Kino Aero',
			getUrl: (_d: Temporal.PlainDate) => 'https://www.kinoaero.cz/en',
			parse: (s: string, d: Temporal.PlainDate) => parseCinemaAero(s, d),
		},
	]

	return Promise.all(cinemas.map(async c => getCinema(date, c)))
}

async function getCinema(date: Temporal.PlainDate, cinemaConf: CinemaConf) {
	const { id, name, getUrl, parse } = cinemaConf

	console.log(`\n -> Fetching program for ${name}...\n`)

	const url = getUrl(date)
	const text = await fetch(url).then(r => r.text())

	return text ? { id, program: parse(text, date) } : null
}

type CinemaConf = {
	id: string
	name: string
	getUrl: (date: Temporal.PlainDate) => string
	parse: (html: string, date: Temporal.PlainDate) => CinemaDayProgram[]
}

type CinemaDayProgram = {
	date: string | null
	movies: {
		title: string | null
		time: string | null
	}[]
}
