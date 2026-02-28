import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

function RootLayout() {
	//
	// move to useContext
	//

	const isMobileMedia = window.matchMedia('(max-width: 431px)') // 430 iPhone Pro Max 14
	const isMobile = isMobileMedia.matches

	return (
		<div className={`${isMobile ? 'p-1' : 'p-4'}`}>
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	)
}

export const Route = createRootRoute({ component: RootLayout })

//
// public navigation removed to make it slightly less public
//

// function RootLayout() {
// 	return (
// 		<>
// 			<div className="p-2">
// 				<ul className="nav nav-pills">
// 					<li className="nav-item">
// 						<Link to="/" className="nav-link">
// 							Home
// 						</Link>
// 					</li>
// 					<li className="nav-item">
// 						<Link to="/cinemas" className="nav-link">
// 							Cinemas
// 						</Link>
// 					</li>
// 					<li className="nav-item">
// 						<Link to="/about" className="nav-link">
// 							About
// 						</Link>
// 					</li>
// 				</ul>
// 			</div>
// 			<Outlet />
// 			<TanStackRouterDevtools />
// 		</>
// 	)
// }
