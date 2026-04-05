import type { CommandDef } from './types';

export const clear: CommandDef = {
	name: 'clear',
	description: 'clear the terminal',
	execute: () => [{ type: 'text', content: '__CLEAR__' }]
};
