import {Helmet} from 'react-helmet-async'

import {UiKitView} from 'src/sections/uikit/view'

// ----------------------------------------------------------------------

export default function UiKitPAge() {
	return (
		<>
			<Helmet>
				<title> UI Kit | BESS UI </title>
			</Helmet>

			<UiKitView />
		</>
	)
}
