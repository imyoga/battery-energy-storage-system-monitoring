import * as React from 'react'

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import {Card, Typography} from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import Iconify from 'src/components/iconify'

const rowData = [
	{
		iconLabel: 'ph:battery-charging',
		iconColor: 'success.main',
		rowInfo: 'State of Health',
		unit: '%',
		rowValue: 70,
	},
	{
		iconLabel: 'subway:power',
		iconColor: 'warning.main',
		rowInfo: 'Voltage',
		unit: 'V',
		rowValue: 118,
	},
	{
		iconLabel: 'mdi:ohm',
		iconColor: 'error.main',
		rowInfo: 'Current',
		unit: 'A',
		rowValue: 11.1,
	},
	{
		iconLabel: 'cbi:battery-temp',
		iconColor: 'info.main',
		rowInfo: 'Battery Temp.',
		unit: '°C',
		rowValue: 35,
	},
	{
		iconLabel: 'grommet-icons:cycle',
		iconColor: 'success.main',
		rowInfo: 'Cycles',
		unit: '',
		rowValue: 1205,
	},
	{
		iconLabel: 'iwwa:year',
		iconColor: 'info.main',
		rowInfo: 'Est. Life',
		unit: 'yrs',
		rowValue: 8,
	},
]

export default function AppBatteryStatus() {
	const [tableData, setTableData] = React.useState(rowData)

	React.useEffect(() => {
		const timer = setInterval(() => {
			setTableData(
				tableData.map((row) => {
					const value = parseFloat(row.rowValue)
					return {
						...row,
						rowValue: generateNearbyValue(value),
					}
				})
			)
		}, 1000)
		return () => clearInterval(timer)
	}, [tableData])

	return (
		<Card sx={{height: '100%', overflow: 'auto', p: 2}}>
			<TableContainer component={Card} sx={{minWidth: 400, boxShadow: 'none'}}>
				<Typography variant='h6' sx={{mb: 2}}>
					Battery Status
				</Typography>
				<Table sx={{minWidth: 400}} size='small' aria-label='a dense table'>
					<TableBody>
						{tableData.map((row, index) => (
							<TableRow key={row.iconLabel}>
								<TableCell
									align='left'
									sx={{
										borderBottom: index === tableData.length - 1 ? 'none' : '',
									}}
								>
									<Iconify
										icon={row.iconLabel}
										width={20}
										color={row.iconColor}
									/>
								</TableCell>
								<TableCell
									align='left'
									sx={{
										borderBottom: index === tableData.length - 1 ? 'none' : '',
									}}
								>
									<Typography variant='body2'>{row.rowInfo}</Typography>
								</TableCell>
								<TableCell
									align='left'
									sx={{
										width: 150,
										whiteSpace: 'nowrap',
										borderBottom: index === tableData.length - 1 ? 'none' : '',
									}}
								>
									<Typography variant='body2' noWrap>
										{`${row.rowValue}${row.unit}`}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Card>
	)
}

function generateNearbyValue(originalValue, range = 0.1) {
	// Ensure the original value is a number
	const value = parseFloat(originalValue)

	// Generate a random adjustment within the specified range
	const adjustment = (Math.random() - 0.5) * 2 * range * value

	// Calculate the new value
	let newValue = value + adjustment

	// Ensure the new value doesn't deviate too far from the original
	newValue = Math.max(
		value * (1 - range),
		Math.min(newValue, value * (1 + range))
	)

	// Round to 2 decimal places for display purposes
	return Math.round(newValue * 100) / 100
}
