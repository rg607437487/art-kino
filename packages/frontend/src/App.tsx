import { useState, useEffect, Fragment } from 'react'
import './App.css'

// TODO fetch in router(tanstack)
// TODO validate with zod, share schema with backend
// TODO cache data on backend somewhere (D1?)

export function App() {
	const [cinemas, setCinemas] = useState<Cinema[]>([])

	console.log('---> cinemas', cinemas)

	useEffect(() => {
		doFetch()

		async function doFetch() {
			try {
				const resp = await fetch('/api/cinemas')

				if (!resp.ok) {
					throw new Error(resp.statusText || 'Failed to fetch cinemas')
				}

				const data = await resp.json()

				if (!Array.isArray(data)) {
					throw new Error('Invalid data format: expected an array of cinemas')
				}

				setCinemas(data)
			} catch (e) {
				console.error(e)
			}
		}
	}, [])

	return (
		<>
			<h1>Art Kino (Exp)</h1>
			{cinemas.map(c => (
				<Cinema key={c.id} {...c} />
			))}
		</>
	)
}

function Cinema(props: Cinema) {
	const { id, program } = props

	return (
		<>
			<h2>{id}</h2>

			{program.map(p => (
				<div key={p.date}>
					<h3>{p.date}</h3>
					<dl>
						{p.movies.map((m, i) => (
							<Fragment key={`${m.title}-${m.time}-${i}`}>
								<dt>{m.time}</dt>
								<dd>{m.title}</dd>
							</Fragment>
						))}
					</dl>
				</div>
			))}
		</>
	)
}

type Cinema = {
	id: string
	program: CinemaDayProgram[]
}

type CinemaDayProgram = {
	date: string | null
	movies: {
		title: string | null
		time: string | null
	}[]
}
