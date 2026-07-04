import type { CommandDef } from './types';
import { person } from '$lib/data';

export const neofetch: CommandDef = {
	name: 'neofetch',
	description: 'display system info',
	execute: () => [
		{
			type: 'neofetch',
			content: '',
			neofetchData: {
				username: 'nielwyn',
				host: 'portfolio',
				info: [
					{ label: 'Role',       value: person.role },
					{ label: 'Focus',      value: 'Backend & cloud infrastructure' },
					{ label: 'Experience', value: `${person.experienceYears}+ years` },
					{ label: 'Status',     value: person.status },
					null,
					{ rowType: 'colors' },
				],
			},
		},
	],
};
