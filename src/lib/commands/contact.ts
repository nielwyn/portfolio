import type { CommandDef } from './types';

export const contact: CommandDef = {
	name: 'contact',
	description: 'how to reach me',
	execute: () => [{ type: 'contact-card', content: '' }]
};
