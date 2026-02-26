import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen.ts'
import './main.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const rootEl = document.getElementById('root')!
const root = createRoot(rootEl)

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
