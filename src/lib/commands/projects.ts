import type { CommandDef } from './types';

export const work: CommandDef = {
	name: 'work',
	description: 'work history',
	execute: () => [{ type: 'work-card', content: '' }]
};

export const projects: CommandDef = {
	name: 'projects',
	description: 'personal projects',
	execute: () => [{ type: 'projects-card', content: '' }]
};
