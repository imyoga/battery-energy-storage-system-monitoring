import {Card, Stack, Typography} from '@mui/material'

import Iconify from 'src/components/iconify'
import EnergyToggleButton from 'src/components/toggle-button'

export default function EnergyManagement() {
	const dataset = [
		{
			icon: 'material-symbols:nest-found-savings-outline-rounded',
			title: 'Peak Shaving',
			status: ['BATTERY SAVER', 'OPTIMAL', 'AUTO'],
			defaultStatus: 'OPTIMAL',
			iconColor: 'success.main',
		},
		{
			icon: 'material-symbols:reset-white-balance-rounded',
			title: 'Load Balancing',
			status: ['ON', 'OFF', 'AUTO'],
			defaultStatus: 'AUTO',
			iconColor: 'info.main',
		},
		{
			icon: 'mdi:electricity-to-grid',
			title: 'Grid Support',
			status: ['ON', 'OFF', 'AUTO'],
			defaultStatus: 'OFF',
			iconColor: 'warning.main',
		},
	]

	return (
		<Card
			sx={{
				height: '100%',
				overflow: 'auto',
				p: 2,
				px: 3,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Typography variant='h6'>Energy Management</Typography>

			{dataset.map(({icon, title, status, defaultStatus, iconColor}) => (
				<Stack
					key={title}
					gap={1}
					sx={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<Iconify width={40} icon={icon} sx={{color: iconColor}} />
					<Typography variant='body1'>{title}: </Typography>
					<Stack direction='row' alignItems='center' gap={1}>
						<EnergyToggleButton values={status} defaultStatus={defaultStatus} />
					</Stack>
				</Stack>
			))}
		</Card>
	)
}
