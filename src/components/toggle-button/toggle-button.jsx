import {useState} from 'react'
import PropTypes from 'prop-types'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const EnergyToggleButton = ({values, defaultStatus}) => {
	const [alignment, setAlignment] = useState(
		defaultStatus || values[0]?.value || ''
	)

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment)
	}

	return (
		<ToggleButtonGroup
			color='primary'
			value={alignment}
			exclusive
			onChange={handleChange}
			aria-label='Platform'
		>
			{values.map((item) => (
				<ToggleButton
					key={item}
					value={item}
					selected={alignment === item}
					sx={{
						'&.Mui-selected': {
							backgroundColor: '',
						},
						'&.Mui-selected:first-of-type': {
							borderTopLeftRadius: 4,
							borderBottomLeftRadius: 4,
						},
						'&.Mui-selected:last-of-type': {
							borderTopRightRadius: 4,
							borderBottomRightRadius: 4,
						},
					}}
				>
					{item}
				</ToggleButton>
			))}
		</ToggleButtonGroup>
	)
}

EnergyToggleButton.propTypes = {
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
	defaultStatus: PropTypes.string,
}

export default EnergyToggleButton
