import { Temporal } from '@js-temporal/polyfill'

type Opts = {
	MMDD: boolean
}

export function parseDateWWWDDMM(dateRaw: string, today: Temporal.PlainDate, opts?: Opts) {
	if (dateRaw === 'Today') return today
	if (dateRaw === 'Tomorrow') return today.add({ days: 1 })

	const [_, _d, _m] = dateRaw?.split(/[\s./]/) ?? []
	const [d, m] = opts?.MMDD ? [_m, _d] : [_d, _m]

	if (d && m) {
		return Temporal.PlainDate.from({
			year: today.year,
			month: Number(m),
			day: Number(d),
		})
	}

	throw new Error(`Unknown date format: ${dateRaw}`)
}
