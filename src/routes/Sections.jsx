import {lazy, Suspense} from 'react'
import {Outlet, Navigate, useRoutes} from 'react-router-dom'

import DashboardLayout from 'src/layouts/dashboard'

export const IndexPage = lazy(() => import('src/pages/app'))
export const LoginPage = lazy(() => import('src/pages/login'))
export const UiKitPAge = lazy(() => import('src/pages/ui-kit'))
export const Page404 = lazy(() => import('src/pages/page-not-found'))

// ----------------------------------------------------------------------

export default function Router() {
	const routes = useRoutes([
		{
			element: (
				<DashboardLayout>
					<Suspense>
						<Outlet />
					</Suspense>
				</DashboardLayout>
			),
			children: [
				{element: <IndexPage />, index: true},
				{path: 'uikit', element: <UiKitPAge />},
			],
		},
		{
			path: 'login',
			element: <LoginPage />,
		},
		{
			path: '404',
			element: <Page404 />,
		},
		{
			path: '*',
			element: <Navigate to='/404' replace />,
		},
	])

	return routes
}
