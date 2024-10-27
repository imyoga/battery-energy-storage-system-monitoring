/* eslint-disable perfectionist/sort-imports */
import 'src/global.css'

import {useScrollToTop} from 'src/hooks/use-scroll-to-top'

import Router from 'src/routes/Sections'
import ThemeProvider from 'src/theme'

// ----------------------------------------------------------------------

export default function App() {
	useScrollToTop()

	/* We use ThemeProvider to wrap the entire app with our theme, and Router to
    handle client-side routing. */
	return (
		<ThemeProvider>
			<Router />
		</ThemeProvider>
	)
}
