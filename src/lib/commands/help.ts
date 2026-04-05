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
		const lines: OutputBlock[] = cmds.map((c) => ({
			type: 'text',
			content: `  ${c.name.padEnd(12)} —  ${c.description}`
		}));
		return [
			{ type: 'section', content: 'Available commands' },
			{ type: 'text', content: '' },
			...lines,
			{ type: 'text', content: '' },
			{ type: 'text', content: '  ↑ / ↓   navigate command history' },
			{ type: 'text', content: '  clear   wipe the terminal' }
		];
	}
};
