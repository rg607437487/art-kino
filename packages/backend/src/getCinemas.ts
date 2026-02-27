import { Temporal } from '@js-temporal/polyfill'
import { parseCinemaAero } from './parse/parseCinemaAero.ts'
import { parseCinemaAtlas } from './parse/parseCinemaAtlas.ts'

export async function getCinemas(date?: Temporal.PlainDate) {
	const today = date ?? Temporal.Now.plainDateISO()

	// aero

	const aero = await (async () => {
		try {
			const html = await fetchHtml(`https://www.kinoaero.cz/en`)

			return html ? parseCinemaAero(html, today) : null
		} catch (e) {
			console.error('Error fetching/parsing Aero:', e)
		}
	})()

	// atlas

	const atlas = await (async () => {
		try {
			const html = await fetchHtml(
				`https://kinoatlaspraha.cz/ajax_get_program.php?date=${today.toString()}&lang=en`,
				{
					headers: {
						cookie: 'lang=en',
						'User-Agent':
							'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
					},
				},
			)

			return html ? parseCinemaAtlas(html, today) : null
		} catch (e) {
			console.error('Error fetching/parsing Atlas future:', e)
		}
	})()

	const data = [
		{ id: 'aero', name: 'Aero', program: aero },
		{ id: 'atlas', name: 'Atlas', program: atlas },
	]

	return data
}

function fetchHtml(url: string, opts?: RequestInit) {
	return fetch(url, opts).then(r => r.text())
}
