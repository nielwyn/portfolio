import type { CommandDef } from './types';

export const about: CommandDef = {
	name: 'about',
	description: 'about me',
	execute: () => [{ type: 'about-card', content: '' }]
};
