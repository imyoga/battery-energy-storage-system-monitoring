import {useState, useEffect} from 'react'

import Typography from '@mui/material/Typography'

import {fDateTime} from 'src/utils/format-time'

export default function DateTime() {
	const [dateTime, setDateTime] = useState(fDateTime(new Date().toISOString()))

	useEffect(() => {
		const timer = setInterval(() => {
			setDateTime(fDateTime(new Date().toISOString()), 1000)
		})
		return () => clearInterval(timer)
	}, [])

	return (
		<div>
			<Typography
				variant={window.innerWidth > 960 ? 'h6' : 'caption'}
				sx={{color: 'text.secondary'}}
			>
				{dateTime}
			</Typography>
		</div>
	)
}
