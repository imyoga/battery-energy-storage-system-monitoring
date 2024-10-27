/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'

import Typography from '@mui/material/Typography'

import {error, warning, success} from 'src/theme/palette'

export default function SystemStatus() {
	const statuses = [
		{status: 'OPERATIONAL', color: success.main},
		{status: 'MAINTENANCE', color: warning.main},
		{status: 'OUTAGE', color: error.main},
	]

	const [currentStatus, setCurrentStatus] = useState(statuses[0])

	useEffect(() => {
		const interval = setInterval(() => {
			const index = Math.floor(Math.random() * statuses.length)
			setCurrentStatus(statuses[index])
		}, 5000)

		return () => clearInterval(interval)
	}, [statuses])

	const isMdUp = window.innerWidth > 960

	return (
		<div>
			<Typography
				variant={isMdUp ? 'h6' : 'body2'}
				sx={{
					color: 'text.primary',
				}}
			>
				System Status:
			</Typography>
			<Typography
				variant={isMdUp ? 'h6' : 'body2'}
				sx={{
					color: currentStatus.color,
				}}
			>
				{currentStatus.status}
			</Typography>
		</div>
	)
}
