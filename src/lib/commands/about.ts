import type { CommandDef } from './types';

export const about: CommandDef = {
	name: 'about',
	description: 'about me',
	execute: () => [
		{ type: 'text', content: 'Nielwyn — Developer' },
		{ type: 'text', content: '' },
		{ type: 'text', content: 'Open to freelance and full-time roles.' },
		{ type: 'text', content: '' },
		{ type: 'text', content: '  skills    — tech stack' },
		{ type: 'text', content: '  work      — work history' },
		{ type: 'text', content: '  contact   — get in touch' }
	]
};
