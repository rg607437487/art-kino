import { Temporal } from '@js-temporal/polyfill'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
	return (
		<>
			<nav className="navbar navbar-expand-sm bg-body-secondary">
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<h3 style={{ color: 'var(--bs-pink)' }}>Art Kino Praha</h3>
					</a>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item h3 condensed-bold">
								<Link
									to="/cinemas/$cinemaId"
									params={{ cinemaId: 'aero' }}
									className="nav-link"
								>
									Cinemas
								</Link>
							</li>
							<li className="nav-item h3 condensed-bold">
								<Link
									to="/dates/$date"
									params={{ date: Temporal.Now.plainDateISO().toString() }}
									className="nav-link"
								>
									Dates
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}
