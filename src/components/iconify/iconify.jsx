import {forwardRef} from 'react'
import PropTypes from 'prop-types'
import {Icon} from '@iconify/react'

import Box from '@mui/material/Box'

// ----------------------------------------------------------------------

/**
 * Iconify
 *
 * @description
 * A component that renders an icon from the list of over 100,000+ icons from Iconify.
 * You can find the list of icons here: https://iconify.design/
 *
 * @param {IconifyIcon} icon - The name of the icon you want to render.
 * @param {number} width - The width of the icon.
 * @param {object} sx - The styles of the icon.
 *
 * @example
 * <Iconify icon="eva:alert-circle-fill" />
 *
 */
const Iconify = forwardRef(({icon, width = 20, sx, ...other}, ref) => (
	<Box
		ref={ref}
		component={Icon}
		className='component-iconify'
		icon={icon}
		sx={{width, height: width, ...sx}}
		{...other}
	/>
))

Iconify.propTypes = {
	icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
	sx: PropTypes.object,
	width: PropTypes.number,
}

export default Iconify
