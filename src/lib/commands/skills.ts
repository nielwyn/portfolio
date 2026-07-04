import type { CommandDef } from './types';

export const skills: CommandDef = {
	name: 'skills',
	description: 'tech stack',
	execute: () => [{ type: 'skills-card', content: '' }]
};
