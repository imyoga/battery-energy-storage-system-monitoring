import PropTypes from 'prop-types'

import {Card, Stack, Typography} from '@mui/material'

import Iconify from 'src/components/iconify'

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
	title,
	subtitle1,
	subtitle2,
	icon,
	iconColor,
	sx,
	...other
}) {
	return (
		<Card
			component={Stack}
			sx={{
				px: 3,
				py: 3,
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'left',
				alignItems: 'center',
				gap: 2,
				height: 130,
			}}
			{...other}
		>
			<Iconify width={40} icon={icon} sx={{color: iconColor}} />

			<Stack
				gap={0.5}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'left',
				}}
			>
				<Typography variant='h5'>{title}</Typography>

				<Typography variant='subtitle1' sx={{color: 'text.disabled'}}>
					{subtitle1}
				</Typography>

				<Typography variant='subtitle1' sx={{color: 'text.disabled'}}>
					{subtitle2}
				</Typography>
			</Stack>
		</Card>
	)
}

AppWidgetSummary.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle1: PropTypes.string.isRequired,
	subtitle2: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	iconColor: PropTypes.string.isRequired,
	sx: PropTypes.object,
}
