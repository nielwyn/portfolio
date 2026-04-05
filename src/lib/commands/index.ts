import type { CommandDef, OutputBlock } from './types';
import { help, setGetAll } from './help';
import { about } from './about';
import { skills } from './skills';
import { work } from './projects';
import { contact } from './contact';
import { whoami } from './whoami';
import { clear } from './clear';
import { neofetch } from './neofetch';
import { pwd, ls, cat, echo, date, uname } from './fs';

const registry = new Map<string, CommandDef>([
	['help', help],
	['neofetch', neofetch],
	['about', about],
	['skills', skills],
	['work', work],
	['contact', contact],
	['whoami', whoami],
	['clear', clear],
	['pwd', pwd],
	['ls', ls],
	['cat', cat],
	['echo', echo],
	['date', date],
	['uname', uname]
]);

setGetAll(() => [...registry.values()]);

export function dispatch(raw: string): OutputBlock[] {
	const trimmed = raw.trim();
	if (!trimmed) return [];

	// preserve original args (don't lowercase everything — echo/cat need original case)
	const parts = trimmed.split(/\s+/);
	const name = parts[0].toLowerCase();
	const args = parts.slice(1);

	const cmd = registry.get(name);
	if (!cmd) {
		return [
			{
				type: 'error',
				content: `command not found: ${name}  (type 'help' for available commands)`
			}
		];
	}
	return cmd.execute(args);
}

export function getCommands(): CommandDef[] {
	return [...registry.values()];
}
