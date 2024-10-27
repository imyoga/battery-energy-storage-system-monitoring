import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import Chart, {useChart} from 'src/components/chart'

// ----------------------------------------------------------------------

export default function AppPerformanceGraph({title, subheader, ...other}) {
	const chart = {
		labels: generateTimeStamps(),
		series: [
			{
				name: 'Consumption',
				type: 'column',
				fill: 'solid',
				data: generateRandomArray(),
			},
			{
				name: 'Grid Energy',
				type: 'area',
				fill: 'gradient',
				data: generateRandomArray(),
			},
			{
				name: 'System Demand',
				type: 'line',
				fill: 'solid',
				data: generateRandomArray(),
			},
		],
	}
	const {labels, colors, series, options} = chart

	const chartOptions = useChart({
		colors,
		plotOptions: {
			bar: {
				columnWidth: '16%',
			},
		},
		fill: {
			type: series.map((i) => i.fill),
		},
		labels,
		xaxis: {
			type: 'time',
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (value) => {
					if (typeof value !== 'undefined') {
						return `${value.toFixed(0)} kWh`
					}
					return value
				},
			},
		},
		...options,
	})

	return (
		<Card {...other}>
			<CardHeader title={title} subheader={subheader} />

			<Box sx={{p: 3, pb: 1}}>
				<Chart
					dir='ltr'
					type='line'
					series={series}
					options={chartOptions}
					width='100%'
					height={364}
				/>
			</Box>
		</Card>
	)
}

AppPerformanceGraph.propTypes = {
	chart: PropTypes.object,
	subheader: PropTypes.string,
	title: PropTypes.string,
}

function generateTimeStamps() {
	const timeStamps = []
	const date = new Date('2000-01-01T00:00:00') // Use an arbitrary date
	/* eslint-disable no-plusplus */
	for (let i = 0; i < 25; i++) {
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const ampm = hours >= 12 ? 'PM' : 'AM'

		const formattedHours = hours % 12 || 12
		const formattedMinutes = minutes.toString().padStart(2, '0')

		timeStamps.push(`${formattedHours}:${formattedMinutes} ${ampm}`)

		date.setHours(date.getHours() + 1)
	}

	return timeStamps
}

function generateRandomArray() {
	const result = []
	/* eslint-disable no-plusplus */
	for (let i = 0; i < 25; i++) {
		// Generate a random number between 30 and 90
		const randomNumber = Math.random() * (90 - 30) + 30

		// Round to one decimal place
		const roundedNumber = Math.round(randomNumber * 10) / 10

		result.push(roundedNumber)
	}

	return result
}
