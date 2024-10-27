import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'

import {primary, success, warning} from 'src/theme/palette'

import BatteryIcon from 'src/sections/dashboard/battery-icon'

import AppBatteryStatus from '../app-battery-status'
import AppWidgetSummary from '../app-widget-summary'
import EnergyManagement from '../app-energy-management'
import AppPerformanceGraph from '../app-performance-graph'

// ----------------------------------------------------------------------

export default function AppView() {
	return (
		<Container maxWidth='xl' sx={{py: 2}}>
			<Grid container spacing={3}>
				<Grid xs={12} sm={6} md={3}>
					<BatteryIcon />
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title='Power Flow (kW)'
						subtitle1='←200 | 150→'
						subtitle2='Grid ⇆ BESS ⇆ Load'
						icon='entypo:power-plug'
						iconColor={warning.main}
					/>
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title='Performance'
						subtitle1='Uptime: 99.9%'
						subtitle2='Efficiency: 94%'
						icon='eos-icons:performance'
						iconColor={success.main}
					/>
				</Grid>

				<Grid xs={12} sm={6} md={3}>
					<AppWidgetSummary
						title='Weather'
						subtitle1='Temp: 25°C'
						subtitle2='Humidity: 45%'
						icon='fluent:weather-partly-cloudy-day-16-regular'
						iconColor={primary.main}
					/>
				</Grid>

				<Grid xs={12} md={6} lg={6}>
					<AppBatteryStatus />
				</Grid>

				<Grid xs={12} md={6} lg={6}>
					<EnergyManagement />
				</Grid>
				<Grid xs={12} md={12} lg={12}>
					<AppPerformanceGraph
						title='System Performance'
						subheader='(-1.2%) than last month'
						chart={{
							labels: [
								'01/01/2003',
								'02/01/2003',
								'03/01/2003',
								'04/01/2003',
								'05/01/2003',
								'06/01/2003',
								'07/01/2003',
								'08/01/2003',
								'09/01/2003',
								'10/01/2003',
								'11/01/2003',
							],
							series: [
								{
									name: 'Team A',
									type: 'column',
									fill: 'solid',
									data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
								},
								{
									name: 'Team B',
									type: 'area',
									fill: 'gradient',
									data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
								},
								{
									name: 'Team C',
									type: 'line',
									fill: 'solid',
									data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
								},
							],
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	)
}
