import type { CommandDef, OutputBlock } from './types';

let getAll: () => CommandDef[] = () => [];

export function setGetAll(fn: () => CommandDef[]) {
	getAll = fn;
}

export const help: CommandDef = {
	name: 'help',
	description: 'list available commands',
	execute: () => {
		const cmds = getAll();
		const lines: OutputBlock[] = cmds
			.filter((c) => !c.hidden)
			.map((c) => ({
				type: 'text' as const,
				content: `  ${c.name.padEnd(14)} ${c.description}`
			}));
		return [
			{ type: 'section', content: 'Commands' },
			{ type: 'text',    content: '' },
			...lines,
			{ type: 'text',    content: '' },
			{ type: 'text',    content: '  Tab      autocomplete' },
			{ type: 'text',    content: '  ↑ / ↓   command history' },
			{ type: 'text',    content: '  clear    wipe the terminal' }
		];
	}
};
