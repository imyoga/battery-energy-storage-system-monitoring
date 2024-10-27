import {useState} from 'react'
import {set, sub} from 'date-fns'
import PropTypes from 'prop-types'
import {faker} from '@faker-js/faker'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'

import {fToNow} from 'src/utils/format-time'

import {error} from 'src/theme/palette'

import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
	{
		id: faker.string.uuid(),
		title: 'Battery Temperature',
		description:
			'Battery temperature is fluctuating outside of critical range. Immediate action required to prevent damage',
		avatar: null,
		type: 'warning',
		createdAt: set(new Date(), {hours: 10, minutes: 30}),
		isUnRead: true,
	},
	{
		id: faker.string.uuid(),
		title: 'Voltage Drop',
		description: 'Sudden voltage drop across the system detected',
		avatar: '/assets/images/avatars/avatar_2.jpg',
		type: 'failure',
		createdAt: sub(new Date(), {hours: 3, minutes: 30}),
		isUnRead: true,
	},
	{
		id: faker.string.uuid(),
		title: 'Inverter Failure',
		description: 'System operation is compromised; urgent repairs needed',
		avatar: null,
		type: 'warning',
		createdAt: sub(new Date(), {days: 1, hours: 3, minutes: 30}),
		isUnRead: false,
	},
	{
		id: faker.string.uuid(),
		title: 'SOH Degradation',
		description: 'Schedule maintenance and further diagnostics',
		avatar: null,
		type: 'notification',
		createdAt: sub(new Date(), {days: 2, hours: 3, minutes: 30}),
		isUnRead: false,
	},
	{
		id: faker.string.uuid(),
		title: 'Unusual Charging Patterns',
		description: 'Investigate potential issues with load or generation sources',
		avatar: null,
		type: 'alert',
		createdAt: sub(new Date(), {days: 3, hours: 3, minutes: 30}),
		isUnRead: false,
	},
]

export default function NotificationsPopover() {
	const [notifications, setNotifications] = useState(NOTIFICATIONS)

	const totalUnRead = notifications.filter(
		(item) => item.isUnRead === true
	).length

	const [open, setOpen] = useState(null)

	const handleOpen = (event) => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	const handleMarkAllAsRead = () => {
		setNotifications(
			notifications.map((notification) => ({
				...notification,
				isUnRead: false,
			}))
		)
	}

	return (
		<>
			<IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
				<Badge badgeContent={totalUnRead} color='error'>
					<Iconify width={24} icon='solar:bell-bing-bold-duotone' />
				</Badge>
			</IconButton>

			<Popover
				open={!!open}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
				transformOrigin={{vertical: 'top', horizontal: 'right'}}
				PaperProps={{
					sx: {
						mt: 1.5,
						ml: 0.75,
						width: 360,
					},
				}}
			>
				<Box sx={{display: 'flex', alignItems: 'center', py: 2, px: 2.5}}>
					<Box sx={{flexGrow: 1}}>
						<Typography variant='subtitle1'>Notifications</Typography>
						<Typography variant='body2' sx={{color: 'text.secondary'}}>
							You have {totalUnRead} unread messages
						</Typography>
					</Box>

					{totalUnRead > 0 && (
						<Tooltip title=' Mark all as read'>
							<IconButton color='primary' onClick={handleMarkAllAsRead}>
								<Iconify icon='eva:done-all-fill' />
							</IconButton>
						</Tooltip>
					)}
				</Box>

				<Divider sx={{borderStyle: 'dashed'}} />

				<Scrollbar sx={{height: {xs: 340, sm: 'auto'}}}>
					<List
						disablePadding
						subheader={
							<ListSubheader
								disableSticky
								sx={{py: 1, px: 2.5, typography: 'overline'}}
							>
								New
							</ListSubheader>
						}
					>
						{notifications.slice(0, 2).map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))}
					</List>

					<List
						disablePadding
						subheader={
							<ListSubheader
								disableSticky
								sx={{py: 1, px: 2.5, typography: 'overline'}}
							>
								Before that
							</ListSubheader>
						}
					>
						{notifications.slice(2, 5).map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))}
					</List>
				</Scrollbar>

				<Divider sx={{borderStyle: 'dashed'}} />

				<Box sx={{p: 1}}>
					<Button fullWidth disableRipple>
						View All
					</Button>
				</Box>
			</Popover>
		</>
	)
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
	notification: PropTypes.shape({
		createdAt: PropTypes.instanceOf(Date),
		id: PropTypes.string,
		isUnRead: PropTypes.bool,
		title: PropTypes.string,
		description: PropTypes.string,
		type: PropTypes.string,
		avatar: PropTypes.any,
	}),
}

function NotificationItem({notification}) {
	const {avatar, title} = renderContent(notification)

	return (
		<ListItemButton
			sx={{
				py: 1.5,
				px: 2.5,
				mt: '1px',
				...(notification.isUnRead && {
					bgcolor: 'action.selected',
				}),
			}}
		>
			<ListItemAvatar>
				<Avatar sx={{bgcolor: 'background.neutral'}}>{avatar}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={title}
				secondary={
					<Typography
						variant='caption'
						sx={{
							mt: 0.5,
							display: 'flex',
							alignItems: 'center',
							color: 'text.disabled',
						}}
					>
						<Iconify
							icon='eva:clock-outline'
							sx={{mr: 0.5, width: 16, height: 16}}
						/>
						{fToNow(notification.createdAt)}
					</Typography>
				}
			/>
		</ListItemButton>
	)
}

// ----------------------------------------------------------------------

function renderContent(notification) {
	const title = (
		<Typography variant='subtitle2'>
			{notification.title}
			<Typography
				component='span'
				variant='body2'
				sx={{color: 'text.secondary'}}
			>
				&nbsp; {notification.description}
			</Typography>
		</Typography>
	)

	const typeToIcon = {
		warning: <Iconify icon='fxemoji:warningsign' />,
		failure: <Iconify icon='tabler:refresh-alert' sx={{color: error.main}} />,
		notification: <Iconify icon='fluent-color:alert-24' />,
		alert: <Iconify icon='fluent-color:error-circle-16' />,
	}

	return {
		avatar: typeToIcon[notification.type],
		title,
	}
}
