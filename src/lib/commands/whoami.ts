import type { CommandDef } from './types';

export const whoami: CommandDef = {
	name: 'whoami',
	description: 'display current user',
	execute: () => [{ type: 'text', content: 'nielwyn — developer' }]
};
