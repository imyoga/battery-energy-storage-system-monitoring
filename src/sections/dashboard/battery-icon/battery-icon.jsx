import {useState, useEffect} from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import BatteryGauge from 'react-battery-gauge'

import {Card, Stack, Typography} from '@mui/material'

import {error, warning, success} from 'src/theme/palette'

const BatteryIcon = () => {
	const [batteryValue, setBatteryValue] = useState(5)
	const getBatteryColor = (percentage) => {
		if (percentage <= 20) return error.main
		if (percentage <= 50) return warning.main
		return success.main
	}

	const customization = {
		batteryBody: {
			strokeWidth: 2,
			cornerRadius: 6,
			fill: 'none',
			strokeColor: '#333',
		},
		batteryCap: {
			fill: 'none',
			strokeWidth: 2,
			strokeColor: '#333',
			cornerRadius: 2,
			capToBodyRatio: 0.4,
		},
		batteryMeter: {
			fill: getBatteryColor(batteryValue),
		},
		readingText: {
			lightContrastColor: '#333',
			darkContrastColor: '#fff',
			lowBatteryColor: error.main,
			fontFamily: 'Public Sans, sans-serif',
			fontSize: 20,
			showPercentage: true,
		},
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setBatteryValue((prevValue) => {
				const increment = Math.floor(Math.random() * (6 - 3 + 1)) + 3
				const newValue = prevValue + increment
				return newValue >= 100 ? 0 : newValue
			})
		}, 2400)
		return () => clearInterval(interval)
	}, [])
	return (
		<Card
			sx={{
				px: 3,
				py: 5,
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'row',
				gap: 3,
				alignItems: 'center',
				justifyContent: 'left',
				height: 130,
			}}
		>
			<BatteryGauge
				customization={customization}
				value={batteryValue}
				size={75}
			/>
			<Stack spacing={0.5}>
				<Typography variant='h5'>Battery</Typography>

				<Typography variant='subtitle2' sx={{color: 'text.disabled'}}>
					State of Charge
				</Typography>
			</Stack>
		</Card>
	)
}

export default BatteryIcon
