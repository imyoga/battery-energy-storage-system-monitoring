import {faker} from '@faker-js/faker'

// ----------------------------------------------------------------------

export const account = {
	displayName: faker.person.fullName(),
	email: faker.internet.email(),
	photoURL: '/assets/images/avatars/avatar_25.jpg',
}
