import type { CommandDef } from './types';
import { person } from '$lib/data';

export const whoami: CommandDef = {
	name: 'whoami',
	description: 'display current user',
	execute: () => [{ type: 'text', content: `${person.handle} — ${person.role.toLowerCase()}` }]
};
