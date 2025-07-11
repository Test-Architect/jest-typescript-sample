import _ from 'lodash';

export interface UpdatePETPayload {
	id: number;
	category: {
		id: number;
		name: string;
	};
	name: string;
	photoUrls: string[];
	tags: {
		id: number;
		name: string;
	}[];
	status: string;
}

export const petStoreApiSchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			id: { type: 'number' },
			category: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					name: { type: 'string' }
				}
			},
			name: { type: 'string' },
			photoUrls: {
				type: 'array',
				items: { type: 'string' }
			},
			tags: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: { type: 'number' },
						name: { type: 'string' }
					}
				}
			},
			status: { type: 'string' }
		}
	}
};

export const updatePetAPISchema = {
	type: 'object',
	properties: {
		id: { type: 'number' },
		category: {
			type: 'object',
			properties: {
				id: { type: 'number' },
				name: { type: 'string' }
			}
		},
		name: { type: 'string' },
		photoUrls: {
			type: 'array',
			items: { type: 'string' }
		},
		tags: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					name: { type: 'string' }
				}
			}
		},
		status: { type: 'string' }
	}
};

export function createUpdatePETPayload(petID: number): {
	photoUrls: string[];
	name: string;
	id: number;
	category: { name: string; id: number };
	tags: { name: string; id: number }[];
	status: string;
} {
	const randomNumber = _.random(0, 9999);
	const status = ['available', 'pending', 'sold'];
	const randomStatus = _.sample(status);
	const updatePETPayload = {
		id: 0,
		category: {
			id: 0,
			name: 'string'
		},
		name: 'doggie',
		photoUrls: ['string'],
		tags: [
			{
				id: 0,
				name: 'string'
			}
		],
		status: 'available'
	};
	updatePETPayload.id = petID;
	updatePETPayload.name = 'Oskar_' + randomNumber;
	updatePETPayload.tags[0].id = randomNumber;
	updatePETPayload.tags[0].name = 'IN_' + randomNumber;
	updatePETPayload.status = randomStatus || 'sold';

	return updatePETPayload;
}
