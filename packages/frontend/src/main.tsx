import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MediaContext } from './lib/MediaContext.tsx'
import { routeTree } from './routeTree.gen.ts'
import './main.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const isMobileMedia = window.matchMedia('(max-width: 431px)') // 430 iPhone Pro Max 14
const isMobile = isMobileMedia.matches

const rootEl = document.getElementById('root')!
const root = createRoot(rootEl)

root.render(
	<StrictMode>
		<MediaContext value={{ isMobile }}>
			<RouterProvider router={router} />
		</MediaContext>
	</StrictMode>,
)
