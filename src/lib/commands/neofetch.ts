import type { CommandDef } from './types';

export const neofetch: CommandDef = {
	name: 'neofetch',
	description: 'display system info',
	execute: () => [
		{
			type: 'neofetch',
			content: '',
			neofetchData: {
				avatar: '/avatar.jpg',
				username: 'nielwyn',
				host: 'portfolio',
				info: [
					{ label: 'Role',   value: 'Developer'             },
					{ label: 'OS',     value: 'Arch Linux x86_64'     },
					{ label: 'Shell',  value: 'svelte + bun'          },
					{ label: 'Font',   value: 'JetBrains Mono'        },
					{ label: 'WM',     value: 'SvelteKit'             },
					{ label: 'Status', value: 'Open to opportunities'  },
					null,
					{ rowType: 'colors' },
				],
			},
		},
	],
};
