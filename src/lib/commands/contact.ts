import type { CommandDef } from './types';

export const contact: CommandDef = {
	name: 'contact',
	description: 'how to reach me',
	execute: () => [
		{ type: 'text', content: 'Get in touch:' },
		{ type: 'text', content: '' },
		{ type: 'link', content: '  GitHub   → ', href: 'https://github.com/nielwyn' },
		{ type: 'link', content: '  Email    → ', href: 'mailto:hello@nielwyn.dev' },
		{ type: 'link', content: '  LinkedIn → ', href: 'https://linkedin.com/in/nielwyn' }
	]
};
