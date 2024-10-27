import React from 'react'

import {
	Box,
	Grid,
	Paper,
	Tooltip,
	Snackbar,
	Typography,
	IconButton,
} from '@mui/material'

import {
	grey,
	info,
	error,
	common,
	primary,
	success,
	warning,
	secondary,
} from 'src/theme/palette'

import Iconify from 'src/components/iconify'

const palettes = {
	grey,
	primary,
	secondary,
	info,
	success,
	warning,
	error,
	common,
}

const UiKitView = () => {
	const [snackbar, setSnackbar] = React.useState({
		open: false,
		message: '',
	})

	const getContrastColor = (hexcolor) => {
		hexcolor = hexcolor.replace('#', '')
		const r = parseInt(hexcolor.substr(0, 2), 16)
		const g = parseInt(hexcolor.substr(2, 2), 16)
		const b = parseInt(hexcolor.substr(4, 2), 16)
		const yiq = (r * 299 + g * 587 + b * 114) / 1000
		return yiq >= 128 ? 'rgba(0,0,0,0.87)' : '#fff'
	}

	const copyToClipboard = (colorCode) => {
		navigator.clipboard.writeText(colorCode).then(
			() => {
				setSnackbar({open: true, message: `Copied ${colorCode} to clipboard!`})
			},
			(err) => {
				console.error('Could not copy text: ', err)
			}
		)
	}

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackbar({...snackbar, open: false})
	}

	return (
		<Box sx={{maxWidth: 1200, margin: 'auto', padding: 3}}>
			<Typography variant='h4' gutterBottom>
				Color Palettes
			</Typography>
			{Object.entries(palettes).map(([paletteName, colors]) => (
				<Box key={paletteName} sx={{marginBottom: 4}}>
					<Typography
						variant='h5'
						gutterBottom
						sx={{textTransform: 'capitalize'}}
					>
						{paletteName}
					</Typography>
					<Grid container spacing={2}>
						{Object.entries(colors).map(([colorName, colorCode]) => (
							<Grid item xs={6} sm={4} md={3} lg={2} key={colorName}>
								<Tooltip title='Click to copy' arrow>
									<Paper
										elevation={3}
										sx={{
											'bgcolor': colorCode,
											'color': getContrastColor(colorCode),
											'height': 100,
											'display': 'flex',
											'flexDirection': 'column',
											'justifyContent': 'center',
											'alignItems': 'center',
											'cursor': 'pointer',
											'transition': 'transform 0.2s',
											'&:hover': {
												transform: 'scale(1.05)',
											},
										}}
										onClick={() => copyToClipboard(colorCode)}
									>
										<Typography variant='subtitle2'>{colorName}</Typography>
										<Typography variant='caption'>{colorCode}</Typography>
										<IconButton
											size='small'
											sx={{
												'color': 'inherit',
												'opacity': 0.7,
												'&:hover': {opacity: 1},
											}}
										>
											<Iconify icon='solar:copy-broken' />
										</IconButton>
									</Paper>
								</Tooltip>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				message={snackbar.message}
				action={
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleCloseSnackbar}
					>
						<Iconify icon='mingcute:close-fill' />
					</IconButton>
				}
			/>
		</Box>
	)
}

export default UiKitView
