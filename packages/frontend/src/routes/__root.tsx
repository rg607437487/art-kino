import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function RootLayout() {
	return (
		<>
			<div className="p-2">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/cinemas" className="nav-link">
							Cinemas
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/about" className="nav-link">
							About
						</Link>
					</li>
				</ul>
			</div>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}

export const Route = createRootRoute({ component: RootLayout })
