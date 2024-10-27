import {Helmet} from 'react-helmet-async'

import {AppView} from 'src/sections/overview/view'

// ----------------------------------------------------------------------

export default function AppPage() {
	return (
		<>
			<Helmet>
				<title> Dashboard | BESS UI </title>
			</Helmet>

			<AppView />
		</>
	)
}
